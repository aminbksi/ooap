import { GameState } from "./GameState";
import { Action } from "./action";
import { isDefined } from "./util";

export interface Strategy {
    update(gameState: GameState): Action[];
}

export interface ActionChecker {
    check(gameState: GameState, action: Action): string | undefined;
}

export interface ActionRejection {
    action: Action;
    reason: string;
}

export interface ActionsChecker {
    check(gameState: GameState, actions: Action[]): ActionRejection[];
}

export class ActionRejecter implements ActionsChecker {
    constructor(public checkers: ActionChecker[]) {}

    check(gameState: GameState, actions: Action[]): ActionRejection[] {
        return this.checkers
            .flatMap((checker) =>
                actions.map((action) => {
                    const reason = checker.check(gameState, action);
                    if (reason) {
                        return { action, reason };
                    } else {
                        return undefined;
                    }
                })
            )
            .filter(isDefined);
    }
}
