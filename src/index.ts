import "source-map-support/register";

import * as grpc from "@grpc/grpc-js";
import { writeFile } from "fs/promises";
import { GameState } from "./GameState";
import { ActionType } from "./action";
import { ExistingCellsCollisionChecker } from "./checkers/ExistingCellsCollisionChecker";
import { NextActionCollisionActionsChecker } from "./checkers/NextActionCollisionActionsChecker";
import { StartAddressChecker } from "./checkers/StartAddressChecker";
import { MyClient } from "./client";
import { PlayerHostClient } from "./generated/player_grpc_pb";
import {
    EmptyRequest,
    GameUpdateMessage,
    ServerUpdateMessage,
} from "./generated/player_pb";
import { MainStrategy } from "./strategies/MainStrategy";
import { ActionRejecter } from "./strategy";
import { isDefined, random } from "./util";

export const client = new PlayerHostClient(
    "192.168.178.62:5168",
    grpc.credentials.createInsecure()
);

console.log("Subscribing...");

const serverEvents = client.subscribeToServerEvents(new EmptyRequest());
serverEvents.on("event", function (thing: ServerUpdateMessage) {
    console.log("event", thing.toObject());
});

console.log("Subscribed");

const myClient = new MyClient(client);

const PLAYER_NAME = `ForTheWin_${random(0, 0xffff).toString(16)}`;
async function main() {
    const gameSettings = await myClient.register({ playername: PLAYER_NAME });
    console.log("gameSettings", gameSettings);
    const gameState = new GameState(
        gameSettings.dimensionsList,
        gameSettings.startaddressList,
        PLAYER_NAME,
        gameSettings.playeridentifier,
        gameSettings.gamestarted
    );
    const initialGameState = await myClient.getGameState();
    gameState.setState(initialGameState);
    const gameUpdates = myClient.subscribe();
    const strategy = new MainStrategy(gameState);
    const actionRejecters = [
        new ActionRejecter([
            new StartAddressChecker(),
            new ExistingCellsCollisionChecker(),
        ]),
        new NextActionCollisionActionsChecker(),
    ];
    if (!gameState.running) {
        console.log("WAITING FOR START");
    }
    let lastFoodLogged: number = 0;
    let tickCount = 0;
    gameUpdates.on("data", async function (rawUpdate: GameUpdateMessage) {
        // console.debug("loop");
        if (!gameState.running) {
            console.log("STARTED");
            gameState.run();
        }
        const update = rawUpdate.toObject();
        // console.log("update", update.updatedcellsList);
        if (update.removedsnakesList.length > 0) {
            console.log("removedSnakes", update.removedsnakesList);
        }
        gameState.update(update);
        const snakeAdminValidationErrors = gameState.validateSnakes();
        if (snakeAdminValidationErrors.length > 0) {
            console.warn(
                "Snake administration incorrect: ",
                snakeAdminValidationErrors.join("\n")
            );
        }

        if (gameState.snakes.length === 0) {
            console.error("NO SNAKES LEFT");
            process.exit(2);
        }
        if (gameState.foodManager.foods.size === 0) {
            console.error("NO FOOD LEFT");
            process.exit(2);
        }
        if (gameState.foodManager.foods.size !== lastFoodLogged) {
            lastFoodLogged = gameState.foodManager.foods.size;
            console.log("Food available", lastFoodLogged);
        }
        const actions = strategy.update();
        const actionRejections = actionRejecters.flatMap((rejecter) =>
            rejecter.check(gameState, actions)
        );

        if (actionRejections.length > 0) {
            for (const { action, reason } of actionRejections) {
                console.warn("rejectAction", action, reason);
            }
        }
        const filteredActions = actions.filter(
            (action) =>
                !actionRejections.some(
                    (rejection) => rejection.action === action
                )
        );
        gameState.applyActions(filteredActions);
        for (const action of filteredActions) {
            switch (action.type) {
                case ActionType.Move:
                    {
                        // gameState
                        //     .getSnake(action.snakeName)
                        //     ?.log(`move`, action.nextLocation);
                        await myClient.moveSnake(action);
                    }
                    break;
                case ActionType.Split:
                    {
                        gameState
                            .getSnake(action.oldSnakeName)
                            ?.log(
                                `split to ${action.newSnakeName} length ${action.snakeSegment}`
                            );
                        await myClient.splitSnake(action);
                    }
                    break;
            }
        }

        const snakesWithMoves = new Set(
            filteredActions
                .map(
                    (action) =>
                        (action.type === ActionType.Move && action.snakeName) ||
                        undefined
                )
                .filter(isDefined)
        );
        const missingSnakesMoves = new Set(
            gameState.snakes.filter((snake) => !snakesWithMoves.has(snake.name))
        );
        const strategyText = strategy.inspect();
        const overallText = [
            `tick=${tickCount++}`,
            `food=${gameState.foodManager.foods.size}`,
            `running=${gameState.running}`,
            `stuckSnakes=${missingSnakesMoves}`,
        ];
        await writeFile(
            "./state.txt",
            [overallText, strategyText, ""].join("\n")
        );
    });
}

main().catch((err) => {
    console.error("FATAL", err);
    process.exit(1);
});
