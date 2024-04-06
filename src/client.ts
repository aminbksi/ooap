import * as grpc from "@grpc/grpc-js";
import { promisify } from "util";
import { client } from ".";
import { Move, Split } from "./action";
import { UUID } from "./common";
import { PlayerHostClient } from "./generated/player_grpc_pb";
import {
    EmptyRequest,
    GameSettings,
    GameStateMessage,
    GameUpdateMessage,
    Move as MoveRequest,
    RegisterRequest,
    SplitRequest,
    SubsribeRequest,
} from "./generated/player_pb";

export class MyClient {
    playerIdentifier: UUID | undefined;

    constructor(public client: PlayerHostClient) {}

    public setPlayerIdentifier(id: UUID): void {
        this.playerIdentifier = id;
    }

    public async register(
        request: RegisterRequest.AsObject
    ): Promise<GameSettings.AsObject> {
        const req = new RegisterRequest();
        req.setPlayername(request.playername);
        const settings = (
            await promisify<RegisterRequest, GameSettings>(
                client.register.bind(client)
            )(req)
        ).toObject();
        this.setPlayerIdentifier(settings.playeridentifier);
        return settings;
    }

    public async getGameState(): Promise<GameStateMessage.AsObject> {
        const req = new EmptyRequest();
        const gameState = (
            await promisify<EmptyRequest, GameStateMessage>(
                client.getGameState.bind(client)
            )(req)
        ).toObject();
        return gameState;
    }

    public subscribe(): grpc.ClientReadableStream<GameUpdateMessage> {
        const req = new SubsribeRequest();
        if (!this.playerIdentifier) {
            throw new Error("missing playerIdentifier");
        }
        req.setPlayeridentifier(this.playerIdentifier);
        return client.subscribe(req);
    }

    public async splitSnake(request: Split): Promise<void> {
        const req = new SplitRequest();
        if (!this.playerIdentifier) {
            throw new Error("missing playerIdentifier");
        }
        req.setPlayeridentifier(this.playerIdentifier);
        req.setOldsnakename(request.oldSnakeName);
        req.setNewsnakename(request.newSnakeName);
        req.setSnakesegment(request.snakeSegment);
        req.setNextlocationList(request.nextLocation);
        await promisify<SplitRequest, EmptyRequest>(
            client.splitSnake.bind(client)
        )(req);
    }

    public async moveSnake(request: Move): Promise<void> {
        const req = new MoveRequest();
        if (!this.playerIdentifier) {
            throw new Error("missing playerIdentifier");
        }
        req.setPlayeridentifier(this.playerIdentifier);
        req.setSnakename(request.snakeName);
        req.setNextlocationList(request.nextLocation);
        await promisify<MoveRequest, EmptyRequest>(
            client.makeMove.bind(client)
        )(req);
    }
}
