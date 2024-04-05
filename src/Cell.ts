import { Address } from "./common";

export class Cell {
    address: Address = [];
    hasFood = false;
    hasPlayer = false;

    constructor(address: Address, hasFood: boolean, hasPlayer: boolean) {
        this.hasFood = hasFood;
        this.hasPlayer = hasPlayer;
        this.address = address;
    }
}
