import { GameState } from "../GameState";
import { Action, ActionType } from "../action";
import { ActionChecker } from "../strategy";

export class ExistingCellsCollisionChecker implements ActionChecker {
    check(gameState: GameState, action: Action): string | undefined {
        const cell = gameState.getCell(action.nextLocation);

        let avoidCollision: Boolean = true;
        if (action.type === ActionType.Move) {
            avoidCollision = !action.snakeName.endsWith(`_k`);
        }

        if (avoidCollision) {
            if (cell.player) {
                return `Preventing collide with existing cell from ${cell.player}.`;
            }
        } else {
            if (cell.player && cell.player == gameState.playerName) {
                return `Preventing kamikaze collide with cell owned by us.`;
            }
        }
    }
}
