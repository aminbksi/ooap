import { TargetSnakeStrategy } from "./TargetSnakeStrategy";

export class FoodSnakeStrategy extends TargetSnakeStrategy {
    isDone(): boolean {
        return (
            super.isDone() || this.gameState.foodManager.hasFood(this.target)
        );
    }
}
