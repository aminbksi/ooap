import { ReadableStream } from "stream/web";
import WebSocket, { CloseEvent, ErrorEvent, MessageEvent } from "ws";
import { Move, Split } from "./action";
import {
    Client,
    GameSettings,
    GameStateMessage,
    GameUpdateMessage,
} from "./client";
import {
    SnakeClientMessage,
    SnakeClientMessageType,
    SnakeServerMessage,
    SnakeServerMessageType,
} from "./protocol";

type MessageOf<T extends SnakeServerMessageType> = Extract<
    SnakeServerMessage,
    { type: T }
>;

export class WsClient implements Client {
    private _ws: WebSocket;
    private _handlers: Set<(msg: SnakeServerMessage) => void> = new Set();

    constructor(public url: string) {
        this._ws = new WebSocket(url);
        this._ws.onopen = () => this._handleOpen();
        this._ws.onclose = (event) => this._handleClose(event);
        this._ws.onerror = (event) => this._handleError(event);
        this._ws.onmessage = (event) => this._handleMessage(event);
    }

    async register(playerName: string): Promise<GameSettings> {
        this._send({ type: SnakeClientMessageType.Register, playerName });
        const { type, ...rest } = await this._receive(
            SnakeServerMessageType.Settings
        );
        return rest;
    }

    async getGameState(): Promise<GameStateMessage> {
        this._send({ type: SnakeClientMessageType.GetGameState });
        const { type, ...rest } = await this._receive(
            SnakeServerMessageType.State
        );
        return rest;
    }

    subscribe(): ReadableStream<GameUpdateMessage> {
        return new ReadableStream({
            start: (controller) => {
                const handler = (msg: SnakeServerMessage) => {
                    if (msg.type === SnakeServerMessageType.Update) {
                        const { type, ...rest } = msg;
                        controller.enqueue(rest);
                    }
                };
                this._handlers.add(handler);
            },
        });
    }

    async splitSnake(request: Split): Promise<void> {
        this._send({ type: SnakeClientMessageType.SplitSnake, ...request });
    }

    async moveSnake(request: Move): Promise<void> {
        this._send({ type: SnakeClientMessageType.MoveSnake, ...request });
    }

    private _handleOpen() {
        // no-op
    }

    private _handleClose(event: CloseEvent) {
        // let it crash for now
        throw new Error("WsClient disconnected");
    }

    private _handleError(event: ErrorEvent) {
        throw new Error(`WsClient error: ${event.error}`);
    }

    private _handleMessage(event: MessageEvent) {
        throw new Error("Method not implemented.");
    }

    private _send(msg: SnakeClientMessage): void {
        this._ws.send(JSON.stringify(msg));
    }

    private _receive<T extends SnakeServerMessageType>(
        type: T
    ): Promise<Extract<SnakeServerMessage, { type: T }>> {
        return new Promise((resolve) => {
            const handler = (msg: SnakeServerMessage) => {
                if (msg.type === type) {
                    resolve(msg as MessageOf<typeof type>);
                    this._handlers.delete(handler);
                }
            };
            this._handlers.add(handler);
        });
    }
}
