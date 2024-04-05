import { Cell } from "./Cell";
import { Snake } from "./Snake";
import { Address, UUID } from "./common";
import { GameUpdateMessage } from "./generated/player_pb";

export class GameState {
    cells: any = [];
    dimensions: number[] = [];
    snakes: Snake[] = [];
    playerIdentifier: string = "";

    constructor(
        dims: number[],
        startAddress: Address,
        playerName: string,
        playerIdentifier: UUID
    ) {
        this.snakes.push(new Snake(startAddress, playerName));
        this.dimensions = dims;
        this.cells = this.createNDimArray(dims);
        this.playerIdentifier = playerIdentifier;
    }

    createNDimArray(dimensions: number[]) {
        if (dimensions.length > 0) {
            var dim = dimensions[0];
            var rest = dimensions.slice(1);
            var newArray = new Array();
            for (var i = 0; i < dim; i++) {
                newArray[i] = this.createNDimArray(rest);
            }
            return newArray;
        } else {
            return undefined;
        }
    }

    checkBounds(address: any) {
        for (var i = 0; i < address.length; i++) {
            if (address[i] < 0) {
                return false;
            }
            if (address[i] >= this.dimensions[i]) {
                return false;
            }
        }
        return true;
    }

    getCell(address: any) {
        var cell = this.cells[address];
        if (!cell) {
            cell = new Cell(address, false, false);
        }
        this.cells[address] = cell;
        return cell;
    }

    update(gameUpdate: GameUpdateMessage.AsObject) {
        for (var i = 0; i < gameUpdate.updatedcellsList.length; i++) {
            var cell = this.getCell(gameUpdate.updatedcellsList[i].addressList);
            cell.hasFood = gameUpdate.updatedcellsList[i].foodvalue > 0;
            cell.hasPlayer = gameUpdate.updatedcellsList[i].player.length > 0;
            this.cells[gameUpdate.updatedcellsList[i].address] = cell;
        }
    }

    getNextAddress(address: any) {
        while (true) {
            var newaddr = [...address];
            var dim = Math.floor(Math.random() * this.dimensions.length);
            var dir = Math.floor(Math.random() * 2);
            if (dir > 0) {
                newaddr[dim] += 1;
            } else {
                newaddr[dim] -= 1;
            }
            if (this.checkBounds(newaddr)) {
                var cell = this.getCell(newaddr);
                if (cell.hasPlayer == false) {
                    return newaddr;
                }
            }
        }
    }

    getMoves() {
        var moves = [];
        for (var i = 0; i < this.snakes.length; i++) {
            var snake = this.snakes[i];
            var nextLocation = this.getNextAddress(snake.head);
            snake.head = nextLocation;
            var cell = this.getCell(nextLocation);
            snake.segments.push(nextLocation);

            if (cell.hasFood) {
                snake.length += 1;
            } else {
                snake.segments = snake.segments.slice(1);
            }
            moves.push({
                playerIdentifier: this.playerIdentifier,
                snakeName: snake.name,
                nextLocation: nextLocation,
            });
        }

        return moves;
    }

    getSplits() {
        var splits = [];
        for (var i = 0; i < this.snakes.length; i++) {
            var snake = this.snakes[i];
            if (snake.length > 2 && this.snakes.length < 11) {
                snake.length -= 1;
                snake.kidcount += 1;
                var newHead = snake.segments[0];
                snake.segments = snake.segments.slice(1);
                var newSnake = new Snake(
                    newHead,
                    snake.name + "." + snake.kidcount
                );
                this.snakes.push(newSnake);
                var address = this.getNextAddress(newHead);
                newSnake.head = address;
                var cell = this.getCell(address);
                newSnake.segments.push(address);
                if (cell.hasFood) {
                    newSnake.length += 1;
                } else {
                    newSnake.segments.shift();
                }

                splits.push({
                    playerIdentifier: this.playerIdentifier,
                    newSnakeName: newSnake.name,
                    oldSnakeName: snake.name,
                    snakeSegment: 1,
                    nextLocation: address,
                });
            }
        }

        return splits;
    }
}
