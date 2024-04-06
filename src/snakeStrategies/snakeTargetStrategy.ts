import { GameState } from "../GameState";
import { Snake } from "../Snake";
import { Action, ActionType } from "../action";
import { nextSteps, sameAddress } from "../address";
import { Address } from "../common";

export interface SnakeStrategy {
    update(): Action[];
}

export class TargetSnakeStrategy implements SnakeStrategy {
    constructor(
        public gameState: GameState,
        public snake: Snake,
        public target: Address
    ) {}

    isTargetReached(): boolean {
        return sameAddress(this.target, this.snake.head);
    }

    update(): Action[] {
        const steps = nextSteps(this.snake.head, this.target);
        if (steps.length > 0) {
            return [
                {
                    type: ActionType.Move,
                    snakeName: this.snake.name,
                    nextLocation: steps[0],
                },
            ];
        }
        return [];
    }
}
