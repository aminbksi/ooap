export type Address = number[];

export enum CellType {
    Empty = "empty",
    Food = "food",
    Snake = "snake",
}

export enum SnakeServerMessageType {
    Settings = "settings",
    State = "state",
    Update = "update",
}

export interface SettingsServerMessage {
    type: SnakeServerMessageType.Settings;
    dimensions: Address;
    startAddress: Address;
    gameStarted: boolean;
}

export interface UpdatedCell {
    address: Address;
    playerName?: string;
    hasFood: boolean;
}

export interface PlayerScore {
    playerName: string;
    score: number;
    snakes: number;
}

export interface GameStateServerMessage {
    type: SnakeServerMessageType.State;
    updatedCells: UpdatedCell[];
}

export interface UpdateFieldServerMessage {
    type: SnakeServerMessageType.Update;
    updatedCells: UpdatedCell[];
    removedSnakes: string[];
    playerScores: PlayerScore[];
}

export type SnakeServerMessage =
    | SettingsServerMessage
    | GameStateServerMessage
    | UpdateFieldServerMessage;

export enum SnakeClientMessageType {
    Register = "register",
    GetGameState = "getGameState",
    Subscribe = "subscribe",
    SplitSnake = "splitSnake",
    MoveSnake = "moveSnake",
}

export interface RegisterClientMessage {
    type: SnakeClientMessageType.Register;
    playerName: string;
}

export interface GetGameStateClientMessage {
    type: SnakeClientMessageType.GetGameState;
}

export interface SubscribeClientMessage {
    type: SnakeClientMessageType.Subscribe;
}

export interface SplitSnakeClientMessage {
    type: SnakeClientMessageType.SplitSnake;
    newSnakeName: string;
    oldSnakeName: string;
    snakeSegment: number;
    nextLocation: Address;
}

export interface MoveSnakeClientMessage {
    type: SnakeClientMessageType.MoveSnake;
    snakeName: string;
    nextLocation: Address;
}

export type SnakeClientMessage =
    | RegisterClientMessage
    | GetGameStateClientMessage
    | SubscribeClientMessage
    | SplitSnakeClientMessage
    | MoveSnakeClientMessage;
