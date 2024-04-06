import { GameState } from "../GameState";
import { Snake } from "../Snake";
import { Action, ActionType, SplitAction } from "../action";
import { toFlat } from "../address";
import { Address, SnakeName } from "../common";
import { FoodSnakeStrategy } from "../snakeStrategies/FoodSnakeStrategy";
import { SaveSnakeStrategy } from "../snakeStrategies/SaveSnakeStrategy";
import { SnakeStrategy } from "../snakeStrategies/SnakeStrategy";
import { Strategy } from "../strategy";
import { isDefined } from "../util";

export class MainStrategy implements Strategy {
    snakeStrategies: Map<SnakeName, SnakeStrategy> = new Map();

    constructor(
        public gameState: GameState,
        public saveLength: number = 10,
        public desiredMainSnakes: number = 10
    ) {}

    update(): Action[] {
        return [
            ...this.executeSplitStrategies(),
            ...this.executeSnakeStrategies(),
        ];
    }

    inspect(): string {
        return this.gameState.snakes
            .map((snake) => {
                const strat = this.snakeStrategies.get(snake.name);
                return `[${snake.name}:${snake.length}] head=${toFlat(
                    snake.head
                )} strategy=${strat?.inspect()}`;
            })
            .join("\n");
    }

    getNextAddress(
        gameState: GameState,
        address: Address
    ): Address | undefined {
        let i = 10;
        while (i-- > 0) {
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

    splitSnake(
        snake: Snake,
        gameState: GameState,
        amount: number
    ): Action | undefined {
        const kidSnake = snake.getKid(1);
        const next = this.getNextAddress(gameState, kidSnake.head);
        if (next) {
            const splitAction: SplitAction = {
                type: ActionType.Split,
                newSnakeName: kidSnake.name,
                oldSnakeName: snake.name,
                snakeSegment: kidSnake.length,
                nextLocation: next,
            };
            return splitAction;
        }
    }

    executeSplitStrategies(): Action[] {
        const actions: Action[] = [];
        let splitCount = 0;
        for (const snake of this.gameState.snakes) {
            if (
                this.gameState.snakes.length + splitCount <
                this.desiredMainSnakes
            ) {
                if (snake.length > 1) {
                    // Split when we have splittable snakes until we have enough snakes.
                    snake.log(`splitting`);
                    const kid = this.splitSnake(snake, this.gameState, 1);
                    if (kid) {
                        splitCount++;
                        actions.push(kid);
                    }
                }
            }
        }

        return actions;
    }

    executeSnakeStrategies(): Action[] {
        const actions: Action[] = [];
        for (const snake of this.gameState.snakes) {
            let snakeStrat = this.snakeStrategies.get(snake.name);
            // Remove target if it's no longer applicable
            if (snakeStrat) {
                // Target reached?
                const doneReason = snakeStrat.isDone();
                if (doneReason) {
                    snake.log(
                        `target done (${doneReason}), was ${snakeStrat.inspect()}`
                    );
                    snakeStrat = undefined;
                }
            }
            if (snakeStrat && !(snakeStrat instanceof SaveSnakeStrategy)) {
                if (snake.length > this.saveLength) {
                    snake.log(`snake too long, saving`);
                    snakeStrat = new SaveSnakeStrategy(
                        this.gameState,
                        snake,
                        this.gameState.startAddress
                    );
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
                const closestFoods = this.gameState.foodManager.getClosest(
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
                    snake.log(`new food target`, newFood);
                    snakeStrat = new FoodSnakeStrategy(
                        this.gameState,
                        snake,
                        newFood
                    );
                }
            }
            // Update new strategy, even if it's now undefined
            if (snakeStrat) {
                this.snakeStrategies.set(snake.name, snakeStrat);
            } else {
                snake.log(`no new strategy available`);
                this.snakeStrategies.delete(snake.name);
            }
            if (snakeStrat) {
                actions.push(...snakeStrat.update());
            }
        }
        return actions;
    }
}
