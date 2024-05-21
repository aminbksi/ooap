import { Address } from "./common";

export class Cell {
    readonly address: Address;
    readonly hasFood: boolean;
    readonly player: string;
    isOurs: boolean;

    markAsOurs(): void {
        this.isOurs = true;
    }

    isMarkedAsOurs(): boolean {
        return this.isOurs;
    }

    constructor(
        address: Address,
        hasFood: boolean = false,
        player: string = ""
    ) {
        this.hasFood = hasFood;
        this.player = player;
        this.address = address;
        this.isOurs = false;
    }
}
