import { GameState } from "../GameState";
import { Snake } from "../Snake";
import { Action, ActionType, MoveAction, SplitAction } from "../action";
import { Address } from "../common";
import {
    SnakeStrategy,
    TargetSnakeStrategy,
} from "../snakeStrategies/snakeTargetStrategy";
import { Strategy } from "../strategy";

export class MainStrategy implements Strategy {
    snakeStrategies: Map<string, SnakeStrategy> = new Map();

    update(gameState: GameState): Action[] {
        const actions: Action[] = [];
        for (const snake of gameState.snakes) {
            let snakeStrat = this.snakeStrategies.get(snake.name);
            if (snakeStrat instanceof TargetSnakeStrategy) {
                if (snakeStrat.isTargetReached()) {
                    snakeStrat = undefined;
                }
            }
            if (!snakeStrat) {
                snakeStrat = new TargetSnakeStrategy(
                    gameState,
                    snake,
                    gameState.startAddress.map((coord) => 0)
                );
                this.snakeStrategies.set(snake.name, snakeStrat);
            }
            actions.push(...snakeStrat.update());
        }
        return actions;
    }
}
