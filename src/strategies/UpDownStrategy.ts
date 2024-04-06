import { GameState } from "../GameState";
import { Snake } from "../Snake";
import { Action, ActionType, MoveAction, SplitAction } from "../action";
import { sameAddress } from "../address";
import { Strategy } from "../strategy";

export class UpDownStrategy implements Strategy {
    update(gameState: GameState): Action[] {
        return this.getMoves(gameState);
    }

    getMoves(gameState: GameState): MoveAction[] {
        const moves: MoveAction[] = [];
        for (const snake of gameState.snakes) {
            if (!sameAddress(snake.head, gameState.startAddress)) {
                moves.push({
                    type: ActionType.Move,
                    snakeName: snake.name,
                    nextLocation: gameState.startAddress,
                });
            } else {
                const nextLocation = [...snake.head];
                nextLocation[0] += 1;
                moves.push({
                    type: ActionType.Move,
                    snakeName: snake.name,
                    nextLocation: nextLocation,
                });
            }
        }

        return moves;
    }
}
