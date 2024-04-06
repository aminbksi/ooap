import { GameState } from "../GameState";
import { Action } from "../action";
import { ActionChecker } from "../strategy";

export class ExistingCellsCollisionChecker implements ActionChecker {
    check(gameState: GameState, action: Action): string | undefined {
        const cell = gameState.getCell(action.nextLocation);
        if (cell.player) {
            return `would collide with existing cell ${cell.player}`;
        }
    }
}
