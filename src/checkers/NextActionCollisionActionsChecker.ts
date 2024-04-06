import { inspect } from "util";
import { GameState } from "../GameState";
import { Action } from "../action";
import { toFlat } from "../address";
import { FlatAddress } from "../common";
import { ActionRejection, ActionsChecker } from "../strategy";

export class NextActionCollisionActionsChecker implements ActionsChecker {
    check(gameState: GameState, actions: Action[]): ActionRejection[] {
        const rejections: ActionRejection[] = [];
        const newLocations: Map<FlatAddress, Action> = new Map();
        for (const action of actions) {
            const collision = newLocations.get(toFlat(action.nextLocation));
            if (collision) {
                rejections.push({
                    action,
                    reason: `would collide with next action ${inspect(
                        collision
                    )}`,
                });
            }
        }
        return rejections;
    }
}
