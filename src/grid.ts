import { Cell } from "./Cell";
import { Address } from "./common";

export class Grid {
    public cells: Map<string, Cell> = new Map();

    constructor(public dimensions: number[]) {}

    public getCell(address: Address): Cell {
        const add = address.join(",");
        return this.cells.get(add) ?? new Cell(address);
    }

    public setCell(address: Address, cell: Cell): void {
        const add = address.join(",");
        this.cells.set(add, cell);
    }

    checkBounds(address: Address): boolean {
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

    filterAvailable(addresses: Address[]): Address[] {
        return addresses.filter((addr) => !this.getCell(addr).player);
    }
}
