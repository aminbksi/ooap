import { Address } from "./common";

export class Snake {
    head: Address = [];
    segments: Address[] = [];
    length = 1;
    name = "";
    kidcount = 0;

    constructor(address: Address, name: string) {
        console.log("creating new snake", name, address);
        this.head = address;
        this.segments.push(address);
        this.name = name;
    }
}
