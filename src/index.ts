import "source-map-support/register";

import * as grpc from "@grpc/grpc-js";
import { GameState } from "./GameState";
import { ActionType } from "./action";
import { StartAddressChecker } from "./checkers/StartAddressChecker";
import { MyClient } from "./client";
import { PlayerHostClient } from "./generated/player_grpc_pb";
import {
    EmptyRequest,
    GameUpdateMessage,
    ServerUpdateMessage,
} from "./generated/player_pb";
import { MainStrategy } from "./strategies/MainStrategy";
import { isDefined } from "./util";

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

const PLAYER_NAME = "ForTheWin";
async function main() {
    const gameSettings = await myClient.register({ playername: PLAYER_NAME });
    console.log("gameSettings", gameSettings);
    const gameState = new GameState(
        gameSettings.dimensionsList,
        gameSettings.startaddressList,
        PLAYER_NAME,
        gameSettings.playeridentifier
    );
    const gameUpdates = myClient.subscribe({
        playeridentifier: gameSettings.playeridentifier,
    });
    const strategy = new MainStrategy();
    const actionCheckers = [new StartAddressChecker()];
    gameUpdates.on("data", async function (rawUpdate: GameUpdateMessage) {
        const update = rawUpdate.toObject();
        // console.log("update", update.updatedcellsList);
        if (update.removedsnakesList.length > 0) {
            console.log("removedSnakes", update.removedsnakesList);
        }
        gameState.update(update);
        if (gameState.snakes.length === 0) {
            console.error("NO SNAKES LEFT");
            process.exit(2);
        }
        const actions = strategy.update(gameState);
        const actionRejections = actionCheckers
            .flatMap((checker) =>
                actions.map((action) => {
                    const reason = checker.check(gameState, action);
                    if (reason) {
                        return [action, reason];
                    } else {
                        return undefined;
                    }
                })
            )
            .filter(isDefined);
        if (actionRejections.length > 0) {
            for (const [action, reason] of actionRejections) {
                console.warn("reject", action, reason);
            }
        }
        const filteredActions = actions.filter(
            (action) =>
                !actionRejections.some(([rejAction]) => rejAction === action)
        );
        gameState.applyActions(filteredActions);
        for (const action of filteredActions) {
            switch (action.type) {
                case ActionType.Move:
                    {
                        console.log(
                            "move",
                            action.snakeName + ": " + action.nextLocation
                        );
                        await myClient.moveSnake(action);
                    }
                    break;
                case ActionType.Split:
                    {
                        console.log(
                            "splitted " +
                                action.oldSnakeName +
                                " into " +
                                action.newSnakeName
                        );
                        await myClient.splitSnake(action);
                    }
                    break;
            }
        }
    });
}

main().catch((err) => {
    console.error("FATAL", err);
    process.exit(1);
});
