import { Cell } from "./Cell";
import { FoodManager } from "./FoodManager";
import { Snake } from "./Snake";
import { Action, ActionType } from "./action";
import { Address, UUID } from "./common";
import { GameStateMessage, GameUpdateMessage } from "./generated/player_pb";
import { Grid } from "./grid";

export class GameState {
    grid: Grid;
    snakes: Snake[] = [];
    playerIdentifier: string;
    playerName: string;
    startAddress: Address;
    foodManager = new FoodManager();
    running: boolean;

    constructor(
        dims: number[],
        startAddress: Address,
        playerName: string,
        playerIdentifier: UUID,
        running: boolean
    ) {
        this.startAddress = startAddress;
        this.grid = new Grid(dims);
        this.snakes.push(new Snake(playerName, [startAddress]));
        this.playerIdentifier = playerIdentifier;
        this.playerName = playerName;
        this.running = running;
    }

    run(): void {
        this.running = true;
    }

    getCell(address: Address): Cell {
        return this.grid.getCell(address);
    }

    setState(gameState: GameStateMessage.AsObject): void {
        for (const updatedCell of gameState.updatedcellsList) {
            const cell = new Cell(
                updatedCell.addressList,
                updatedCell.foodvalue > 0,
                updatedCell.player === "" ? undefined : updatedCell.player
            );
            this.grid.setCell(updatedCell.addressList, cell);
            if (updatedCell.foodvalue > 0) {
                this.foodManager.addFood(updatedCell.addressList);
            } else {
                this.foodManager.removeFood(updatedCell.addressList);
            }
        }
    }

    update(gameUpdate: GameUpdateMessage.AsObject): void {
        for (const updatedCell of gameUpdate.updatedcellsList) {
            const cell = new Cell(
                updatedCell.addressList,
                updatedCell.foodvalue > 0,
                updatedCell.player === "" ? undefined : updatedCell.player
            );
            this.grid.setCell(updatedCell.addressList, cell);
            if (updatedCell.foodvalue > 0) {
                this.foodManager.addFood(updatedCell.addressList);
            } else {
                this.foodManager.removeFood(updatedCell.addressList);
            }
        }
        if (gameUpdate.removedsnakesList.length > 0) {
            const removedSnakes = new Set(gameUpdate.removedsnakesList);
            this.snakes = this.snakes.filter(
                (snake) =>
                    !removedSnakes.has(`${this.playerName}:${snake.name}`)
            );
        }
    }

    validateSnakes(): string[] {
        let result: string[] = [];
        for (const cell of this.grid.cells.values()) {
            cell.isOurs = false;
        }
        for (const snake of this.snakes) {
            for (const snakeAddress of snake.segments) {
                const snakeCell = this.getCell(snakeAddress);
                snakeCell.markAsOurs();
                if (snakeCell.player !== this.playerName) {
                    result.push(
                        `[${snake.name}] contains a cell (${snakeCell.address}) that is not us but ${snakeCell.player}.`
                    );
                }
            }
        }
        for (const cell of this.grid.cells.values()) {
            if ((cell.player === this.playerName) !== cell.isMarkedAsOurs()) {
                if (cell.isMarkedAsOurs()) {
                    result.push(
                        `Cell ${cell.address} is marked as ours but owned by ${cell.player}.`
                    );
                } else {
                    result.push(
                        `Cell ${cell.address} is not marked as ours but owned by us.`
                    );
                }
            }
        }
        return result;
    }

    applyActions(actions: Action[]): void {
        for (const action of actions) {
            switch (action.type) {
                case ActionType.Move:
                    {
                        const grow = this.grid.getCell(
                            action.nextLocation
                        ).hasFood;
                        this.getSnake(action.snakeName)?.applyMove(
                            action.nextLocation,
                            grow
                        );
                    }
                    break;
                case ActionType.Split:
                    {
                        const growKid = this.grid.getCell(
                            action.nextLocation
                        ).hasFood;
                        const newSnake = this.getSnake(
                            action.oldSnakeName
                        )?.applySplit(action, growKid);
                        if (newSnake) {
                            this.snakes.push(newSnake);
                        }
                    }
                    break;
            }
        }
    }

    getSnake(snakeName: string): Snake | undefined {
        return this.snakes.find((snake) => snake.name === snakeName);
    }
}
