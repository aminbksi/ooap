import { ReadableStream } from "stream/web";
import { promisify } from "util";
import { Move, Split } from "./action";
import {
    Client,
    GameSettings,
    GameStateMessage,
    GameUpdateMessage,
} from "./client";
import { UUID } from "./common";
import { PlayerHostClient } from "./generated/player_grpc_pb";
import {
    EmptyRequest,
    Move as MoveRequest,
    RegisterRequest,
    GameSettings as RpcGameSettings,
    GameStateMessage as RpcGameStateMessage,
    GameUpdateMessage as RpcGameUpdateMessage,
    SplitRequest,
    SubsribeRequest,
} from "./generated/player_pb";

export class RpcClient implements Client {
    private playerIdentifier: UUID | undefined;

    constructor(public client: PlayerHostClient) {}

    private setPlayerIdentifier(id: UUID): void {
        this.playerIdentifier = id;
    }

    public async register(playerName: string): Promise<GameSettings> {
        const req = new RegisterRequest();
        req.setPlayername(playerName);
        const settings = (
            await promisify<RegisterRequest, RpcGameSettings>(
                this.client.register.bind(this.client)
            )(req)
        ).toObject();
        this.setPlayerIdentifier(settings.playeridentifier);
        return {
            dimensions: settings.dimensionsList,
            startAddress: settings.startaddressList,
            gameStarted: settings.gamestarted,
        };
    }

    public async getGameState(): Promise<GameStateMessage> {
        const req = new EmptyRequest();
        const gameState = (
            await promisify<EmptyRequest, RpcGameStateMessage>(
                this.client.getGameState.bind(this.client)
            )(req)
        ).toObject();
        return {
            updatedCells: gameState.updatedcellsList.map((cell) => ({
                address: cell.addressList,
                player: cell.player === "" ? undefined : cell.player,
                hasFood: cell.foodvalue > 0,
            })),
        };
    }

    public subscribe(): ReadableStream<GameUpdateMessage> {
        const req = new SubsribeRequest();
        if (!this.playerIdentifier) {
            throw new Error("missing playerIdentifier");
        }
        req.setPlayeridentifier(this.playerIdentifier);
        const grpcStream = this.client.subscribe(req);
        return new ReadableStream({
            start(controller) {
                grpcStream.on("data", (rawUpdate: RpcGameUpdateMessage) => {
                    const update = rawUpdate.toObject();
                    controller.enqueue({
                        updatedCells: update.updatedcellsList.map((cell) => ({
                            address: cell.addressList,
                            player:
                                cell.player === "" ? undefined : cell.player,
                            hasFood: cell.foodvalue > 0,
                        })),
                        playerScores: update.playerscoresList.map((score) => ({
                            playerName: score.playername,
                            score: score.score,
                            snakes: score.snakes,
                        })),
                        removedSnakes: update.removedsnakesList,
                    });
                });
            },
        });
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
