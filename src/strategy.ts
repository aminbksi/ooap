import { GameState } from "./GameState";
import { Action } from "./action";

export interface Strategy {
    update(gameState: GameState): Action[];
}

export interface ActionChecker {
    check(gameState: GameState, action: Action): string | undefined;
}
