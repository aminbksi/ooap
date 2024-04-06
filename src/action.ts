import { Address } from "./common";

export enum ActionType {
    Split = "Split",
    Move = "Move",
}

export interface SplitAction extends Split {
    type: ActionType.Split;
}

export interface Move {
    snakeName: string;
    nextLocation: Address;
}

export interface MoveAction extends Move {
    type: ActionType.Move;
}

export type Action = MoveAction | SplitAction;

export interface Split {
    newSnakeName: string;
    oldSnakeName: string;
    snakeSegment: number;
    nextLocation: Address;
}
