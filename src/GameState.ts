import { Cell } from "./Cell";
import { FoodManager } from "./FoodManager";
import { Snake } from "./Snake";
import { Action, ActionType } from "./action";
import { GameStateMessage, GameUpdateMessage } from "./client";
import { Address } from "./common";
import { Grid } from "./grid";
import { isDefined } from "./util";

export class GameState {
    grid: Grid;
    snakes: Snake[] = [];
    playerName: string;
    startAddress: Address;
    foodManager = new FoodManager();
    savedSnakes: number;
    running: boolean;
    enemyCellCounts: Map<string, number> = new Map();
    enemyCellCount: number;
    enemyHeads: Map<string, Address[]> = new Map();

    constructor(
        dims: number[],
        startAddress: Address,
        playerName: string,
        running: boolean
    ) {
        this.startAddress = startAddress;
        this.grid = new Grid(dims);
        this.snakes.push(new Snake(playerName, [startAddress]));
        this.playerName = playerName;
        this.savedSnakes = 0;
        this.enemyCellCount = 0;
        this.running = running;
    }

    run(): void {
        this.running = true;
    }

    getCell(address: Address): Cell {
        return this.grid.getCell(address);
    }

    savedSnake(): void {
        this.savedSnakes++;
    }

    setState(gameState: GameStateMessage): void {
        for (const updatedCell of gameState.updatedCells) {
            const cell = new Cell(
                updatedCell.address,
                updatedCell.hasFood,
                updatedCell.player
            );
            this.grid.setCell(updatedCell.address, cell);
            if (updatedCell.hasFood) {
                this.foodManager.addFood(updatedCell.address);
            } else {
                this.foodManager.removeFood(updatedCell.address);
            }
        }
    }

    update(gameUpdate: GameUpdateMessage): void {
        this.enemyHeads = new Map();
        this.enemyCellCount = 0;
        this.grid.clearOwnMarks();
        for (const updatedCell of gameUpdate.updatedCells) {
            const cell = new Cell(
                updatedCell.address,
                updatedCell.hasFood,
                updatedCell.player
            );
            this.grid.setCell(updatedCell.address, cell);
            if (updatedCell.hasFood) {
                this.foodManager.addFood(updatedCell.address);
            } else {
                this.foodManager.removeFood(updatedCell.address);
            }
            if (cell.player) {
                let heads = this.enemyHeads.get(cell.player);
                if (!heads) {
                    heads = [];
                    this.enemyHeads.set(cell.player, heads);
                }
                heads.push(cell.address);
            }
        }
        if (gameUpdate.removedSnakes.length > 0) {
            const removedSnakes = new Set(gameUpdate.removedSnakes);
            const snakesBefore = this.snakes.length;
            this.snakes = this.snakes.filter(
                (snake) =>
                    !removedSnakes.has(`${this.playerName}:${snake.name}`)
            );
            const snakesAfter = this.snakes.length;
            console.log(
                `snake removal, before=${snakesBefore} after=${snakesAfter}`
            );
        }
        const playerNames = [...this.grid.cells.values()]
            .map((cell) => cell.player)
            .filter(isDefined)
            .filter((name) => name !== "")
            .filter((name) => name !== this.playerName);

        console.log(
            `Gamestate update: playernames count=${playerNames.length}`
        );
    
        this.enemyCellCount = playerNames.length;
        
        this.enemyCellCounts = new Map();
        for (const name of playerNames) {
            const count = this.enemyCellCounts.get(name) ?? 0;
            this.enemyCellCounts.set(name, count + 1);
        }
        console.log(
            `Gamestate update: enemy count=${this.enemyCellCounts.keys.length}`
        );

        // Workaround: remove all players that have no recent moves
        // this.enemyCellCounts = new Map(
        //     [...this.enemyCellCounts.entries()].filter(([name]) =>
        //         this.enemyHeads.has(name)
        //     )
        // );
        // console.log(this.enemyCellCounts);
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
