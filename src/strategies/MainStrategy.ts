import { GameState } from "../GameState";
import { Action } from "../action";
import { toFlat } from "../address";
import { SnakeName } from "../common";
import { FoodSnakeStrategy } from "../snakeStrategies/FoodSnakeStrategy";
import { SnakeStrategy } from "../snakeStrategies/SnakeStrategy";
import { TargetSnakeStrategy } from "../snakeStrategies/TargetSnakeStrategy";
import { Strategy } from "../strategy";
import { isDefined } from "../util";

export class MainStrategy implements Strategy {
    snakeStrategies: Map<SnakeName, SnakeStrategy> = new Map();

    update(gameState: GameState): Action[] {
        const actions: Action[] = [];
        for (const snake of gameState.snakes) {
            let snakeStrat = this.snakeStrategies.get(snake.name);
            // Remove target if it's no longer applicable
            if (snakeStrat instanceof TargetSnakeStrategy) {
                // Target reached
                if (snakeStrat.isDone()) {
                    snake.log(`target done, was ${snakeStrat.inspect()}`);
                    snakeStrat = undefined;
                }
            }
            if (!snakeStrat) {
                // Determine which foods are being targeted by our snakes right now
                const lockedFoodsFlatAddresses = new Set(
                    [...this.snakeStrategies.values()]
                        .map((strat) =>
                            strat instanceof FoodSnakeStrategy
                                ? strat.target
                                : undefined
                        )
                        .filter(isDefined)
                        .map(toFlat)
                );
                // console.log(
                //     "lockedFoodsFlatAddresses",
                //     lockedFoodsFlatAddresses
                // );
                const closestFoods = gameState.foodManager.getClosest(
                    snake.head
                );
                // console.log("closestFoods", closestFoods);
                const availableFoods = closestFoods.filter(
                    (foodState) =>
                        !lockedFoodsFlatAddresses.has(toFlat(foodState.address))
                );
                // console.log("availableFoods", availableFoods);
                const newFood = availableFoods[0]?.address;
                if (newFood) {
                    console.log(`[${snake.name}] new food target`, newFood);
                    snakeStrat = new TargetSnakeStrategy(
                        gameState,
                        snake,
                        newFood
                    );
                }
                // Update new strategy, even if it's now undefined
                if (snakeStrat) {
                    this.snakeStrategies.set(snake.name, snakeStrat);
                } else {
                    console.warn(`[${snake.name}] no new strategy available`);
                    this.snakeStrategies.delete(snake.name);
                }
            }
            if (snakeStrat) {
                actions.push(...snakeStrat.update());
            }
        }
        return actions;
    }
}
