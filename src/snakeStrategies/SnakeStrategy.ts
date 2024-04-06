import { Action } from "../action";

export interface SnakeStrategy {
    update(): Action[];
    isDone(): string | undefined;
    inspect(): string;
}
