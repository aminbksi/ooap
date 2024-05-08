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
    player: string;
    foodValue: number;
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
