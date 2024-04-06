import { Cell } from "./Cell";
import { Snake } from "./Snake";
import { Action, ActionType, Move, Split } from "./action";
import { Address, UUID } from "./common";
import { GameUpdateMessage } from "./generated/player_pb";
import { Grid } from "./grid";

export class GameState {
    grid: Grid;
    snakes: Snake[] = [];
    playerIdentifier: string;
    playerName: string;
    startAddress: Address;

    constructor(
        dims: number[],
        startAddress: Address,
        playerName: string,
        playerIdentifier: UUID
    ) {
        this.startAddress = startAddress;
        this.grid = new Grid(dims);
        this.snakes.push(new Snake(playerName, [startAddress]));
        this.playerIdentifier = playerIdentifier;
        this.playerName = playerName;
    }

    getCell(address: Address): Cell {
        return this.grid.getCell(address);
    }

    update(gameUpdate: GameUpdateMessage.AsObject): void {
        for (const updatedCell of gameUpdate.updatedcellsList) {
            const cell = new Cell(
                updatedCell.addressList,
                updatedCell.foodvalue > 0,
                updatedCell.player === "" ? undefined : updatedCell.player
            );
            this.grid.setCell(updatedCell.addressList, cell);
        }
        if (gameUpdate.removedsnakesList.length > 0) {
            const removedSnakes = new Set(gameUpdate.removedsnakesList);
            this.snakes = this.snakes.filter(
                (snake) =>
                    !removedSnakes.has(`${this.playerName}:${snake.name}`)
            );
        }
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
