import "source-map-support/register";

import { PlayerHostClient } from "./generated/player_grpc_pb";
import * as grpc from "@grpc/grpc-js";
import {
    EmptyRequest,
    GameSettings,
    GameUpdateMessage,
    Move,
    RegisterRequest,
    ServerUpdateMessage,
    SplitRequest,
    SubsribeRequest,
} from "./generated/player_pb";
import { promisify } from "util";
import { GameState } from "./GameState";
import { Address } from "./common";

const client = new PlayerHostClient(
    "192.168.178.62:5168",
    grpc.credentials.createInsecure()
);

console.log("starting?");

const serverEvents = client.subscribeToServerEvents(new EmptyRequest());
serverEvents.on("event", function (thing: ServerUpdateMessage) {
    console.log("event", thing.toObject());
});

console.log("Started?");

const req = new RegisterRequest();
req.setPlayername("ForTheWin");

export interface SplitSnakeRequest {
    playerIdentifier: string;
    oldSnakeName: string;
    newSnakeName: string;
    snakeSegment: number;
    nextLocation: Address;
}

export interface MakeMoveRequest {
    playerIdentifier: string;
    snakeName: string;
    nextLocation: Address;
}

export class MyClient {
    constructor(public client: PlayerHostClient) {}

    public async register(
        request: RegisterRequest.AsObject
    ): Promise<GameSettings.AsObject> {
        const req = new RegisterRequest();
        req.setPlayername(request.playername);
        return (
            await promisify<RegisterRequest, GameSettings>(
                client.register.bind(client)
            )(req)
        ).toObject();
    }

    public subscribe(
        request: SubsribeRequest.AsObject
    ): grpc.ClientReadableStream<GameUpdateMessage> {
        const req = new SubsribeRequest();
        req.setPlayeridentifier(request.playeridentifier);
        return client.subscribe(req);
    }

    public async splitSnake(request: SplitSnakeRequest): Promise<void> {
        const req = new SplitRequest();
        req.setPlayeridentifier(request.playerIdentifier);
        req.setOldsnakename(request.oldSnakeName);
        req.setNewsnakename(request.newSnakeName);
        req.setSnakesegment(request.snakeSegment);
        req.setNextlocationList(request.nextLocation);
        await promisify<SplitRequest, EmptyRequest>(
            client.splitSnake.bind(client)
        )(req);
    }

    public async moveSnake(request: MakeMoveRequest): Promise<void> {
        const req = new Move();
        req.setPlayeridentifier(request.playerIdentifier);
        req.setSnakename(request.snakeName);
        req.setNextlocationList(request.nextLocation);
        await promisify<Move, EmptyRequest>(client.makeMove.bind(client))(req);
    }
}

const myClient = new MyClient(client);

async function main() {
    const gameSettings = await myClient.register({ playername: "ForTheWin" });
    console.log("response: ", gameSettings);
    const gameState = new GameState(
        gameSettings.dimensionsList,
        gameSettings.startaddressList,
        "javascript",
        gameSettings.playeridentifier
    );
    const gameUpdates = myClient.subscribe({
        playeridentifier: gameSettings.playeridentifier,
    });
    gameUpdates.on("data", async function (update: GameUpdateMessage) {
        gameState.update(update.toObject());
        var splits = gameState.getSplits();
        for (var i = 0; i < splits.length; i++) {
            var split = splits[i];
            console.log(
                "splitted " + split.oldSnakeName + " into " + split.newSnakeName
            );
            await myClient.splitSnake(split);
        }
        var moves = gameState.getMoves();
        for (var i = 0; i < moves.length; i++) {
            var move = moves[i];
            console.log(move.snakeName + ": " + move.nextLocation);
            await myClient.moveSnake(move);
        }
    });
}

main().catch((err) => {
    console.error("FATAL", err);
    process.exit(1);
});
