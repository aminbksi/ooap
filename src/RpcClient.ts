import * as grpc from "@grpc/grpc-js";
import { promisify } from "util";
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

export class RpcClient {
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
                this.client.register.bind(this.client)
            )(req)
        ).toObject();
        this.setPlayerIdentifier(settings.playeridentifier);
        return settings;
    }

    public async getGameState(): Promise<GameStateMessage.AsObject> {
        const req = new EmptyRequest();
        const gameState = (
            await promisify<EmptyRequest, GameStateMessage>(
                this.client.getGameState.bind(this.client)
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
        return this.client.subscribe(req);
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
            this.client.splitSnake.bind(this.client)
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
            this.client.makeMove.bind(this.client)
        )(req);
    }
}
