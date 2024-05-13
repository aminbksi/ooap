import { ReadableStream } from "stream/web";
import { Move, Split } from "./action";
import { Address } from "./common";

export interface GameSettings {
    dimensions: Address;
    startAddress: Address;
    playerIdentifier: string;
    gameStarted: boolean;
}

export interface GameStateMessage {
    updatedCells: UpdatedCell[];
}

export interface UpdatedCell {
    address: Address;
    player?: string;
    hasFood: boolean;
}

export interface GameUpdateMessage {
    updatedCells: UpdatedCell[];
    removedSnakes: string[];
    playerScores: PlayerScore[];
}

export interface PlayerScore {
    playerName: string;
    score: number;
    snakes: number;
}

export interface Client {
    register(playerName: string): Promise<GameSettings>;
    getGameState(): Promise<GameStateMessage>;

    subscribe(): ReadableStream<GameUpdateMessage>;
    splitSnake(request: Split): Promise<void>;
    moveSnake(request: Move): Promise<void>;
}
