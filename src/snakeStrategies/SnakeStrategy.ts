import { Action } from "../action";

export interface SnakeStrategy {
    update(): Action[];

    inspect(): string;
}
