import { TargetSnakeStrategy } from "./TargetSnakeStrategy";

export class FoodSnakeStrategy extends TargetSnakeStrategy {
    isDone(): string | undefined {
        return (
            super.isDone() ||
            (!this.gameState.foodManager.hasFood(this.target)
                ? "food disappeared"
                : undefined)
        );
    }
}
