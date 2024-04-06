import { GameState } from "../GameState";
import { Snake } from "../Snake";
import { Action, ActionType } from "../action";
import { nextSteps, sameAddress, toFlat } from "../address";
import { Address } from "../common";
import { SnakeStrategy } from "./SnakeStrategy";

export class TargetSnakeStrategy implements SnakeStrategy {
    constructor(
        public gameState: GameState,
        public snake: Snake,
        public target: Address
    ) {}

    isDone(): boolean {
        return this.isTargetReached();
    }

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

    inspect(): string {
        return `[${this.constructor.name} target=${toFlat(this.target)}]`;
    }
}
