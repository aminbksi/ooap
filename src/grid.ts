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

    public clearOwnMarks(): void {
        this.cells.forEach(cell => {
            cell.isOurs = false;
        });
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

    isCellAvailable(address: Address, allowedPlayer: string): boolean {
        return ((!this.getCell(address).player) || (this.getCell(address).player === allowedPlayer)) && (!this.getCell(address).isMarkedAsOurs()) && this.checkBounds(address)
    }

    filterAvailable(addresses: Address[], allowedPlayer: string = ""): Address[] {
        return addresses.filter((addr): addr is Address => this.isCellAvailable(addr, allowedPlayer)) as Address[];
    }
}
