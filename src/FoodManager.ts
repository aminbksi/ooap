import { distance, toFlat } from "./address";
import { Address, FlatAddress } from "./common";

export interface FoodState {
    address: Address;
    snakeName: string | undefined;
}

export class FoodManager {
    foods: Map<FlatAddress, FoodState> = new Map();

    addFood(addr: Address): void {
        const faddr = toFlat(addr);
        if (this.foods.has(faddr)) {
            return;
        }
        this.foods.set(faddr, { address: addr, snakeName: undefined });
    }

    removeFood(addr: Address): void {
        this.foods.delete(toFlat(addr));
    }

    hasFood(addr: Address): boolean {
        return this.foods.has(toFlat(addr));
    }

    getClosest(addr: Address, exclude?: Address): FoodState[] {
        let foods = [...this.foods.values()];
        if (exclude) {
            const excludeFlat = toFlat(exclude);
            foods = foods.filter((f) => toFlat(f.address) !== excludeFlat);
        }
        foods.sort((fs1, fs2) => {
            return distance(fs1.address, addr) - distance(fs2.address, addr);
        });
        return foods;
    }
}
