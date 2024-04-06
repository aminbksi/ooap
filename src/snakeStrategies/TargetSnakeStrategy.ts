import { GameState } from "../GameState";
import { Snake } from "../Snake";
import { Action, ActionType } from "../action";
import { nextSteps, sameAddress, toFlat } from "../address";
import { Address } from "../common";
import { pickRandom } from "../util";
import { SnakeStrategy } from "./SnakeStrategy";

export class TargetSnakeStrategy implements SnakeStrategy {
    constructor(
        public gameState: GameState,
        public snake: Snake,
        public target: Address
    ) {}

    isDone(): string | undefined {
        return this.isTargetReached() ? "target reached" : undefined;
    }

    isTargetReached(): boolean {
        return sameAddress(this.target, this.snake.head);
    }

    update(): Action[] {
        const possibleNextSteps = nextSteps(this.snake.head, this.target);
        const availableSteps =
            this.gameState.grid.filterAvailable(possibleNextSteps);
        const step = pickRandom(availableSteps);
        if (step) {
            return [
                {
                    type: ActionType.Move,
                    snakeName: this.snake.name,
                    nextLocation: step,
                },
            ];
        }
        return [];
    }

    inspect(): string {
        return `[${this.constructor.name} target=${toFlat(this.target)}]`;
    }
}
