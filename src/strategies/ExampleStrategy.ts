import { GameState } from "../GameState";
import { Action, ActionType, MoveAction, SplitAction } from "../action";
import { Address } from "../common";
import { Strategy } from "../strategy";

export class ExampleStrategy implements Strategy {
    inspect(): string {
        return "[ExampleStrategy]";
    }

    update(gameState: GameState): Action[] {
        return [...this.getMoves(gameState), ...this.getSplits(gameState)];
    }

    getMoves(gameState: GameState): MoveAction[] {
        const moves: MoveAction[] = [];
        for (var i = 0; i < gameState.snakes.length; i++) {
            var snake = gameState.snakes[i];
            var nextLocation = this.getNextAddress(gameState, snake.head);
            moves.push({
                type: ActionType.Move,
                snakeName: snake.name,
                nextLocation: nextLocation,
            });
        }

        return moves;
    }

    getSplits(gameState: GameState): SplitAction[] {
        const splits: SplitAction[] = [];
        for (const snake of gameState.snakes) {
            if (snake.length > 2 && gameState.snakes.length < 11) {
                const newSnake = snake.getKid(1);
                const address = this.getNextAddress(gameState, newSnake.head);
                splits.push({
                    type: ActionType.Split,
                    newSnakeName: newSnake.name,
                    oldSnakeName: snake.name,
                    snakeSegment: 1,
                    nextLocation: address,
                });
            }
        }

        return splits;
    }

    getNextAddress(gameState: GameState, address: Address) {
        while (true) {
            var newaddr = [...address];
            var dim = Math.floor(
                Math.random() * gameState.grid.dimensions.length
            );
            var dir = Math.floor(Math.random() * 2);
            if (dir > 0) {
                newaddr[dim] += 1;
            } else {
                newaddr[dim] -= 1;
            }
            if (gameState.grid.checkBounds(newaddr)) {
                var cell = gameState.getCell(newaddr);
                if (!cell.player) {
                    return newaddr;
                }
            }
        }
    }
}
