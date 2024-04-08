import { Address, FlatAddress } from "./common";
import { sum } from "./util";

export function sameAddress(addr1: Address, addr2: Address): boolean {
    return toFlat(addr1) === toFlat(addr2);
}

export function distance(addr1: Address, addr2: Address): number {
    return addr1.map((coord1, i) => Math.abs(coord1 - addr2[i])).reduce(sum, 0);
}

export function nextSteps(from: Address, to: Address): Address[] {
    const steps: Address[] = [];
    for (let i = 0; i < to.length; i++) {
        if (from[i] < to[i]) {
            const step = [...from];
            step[i]++;
            steps.push(step);
        } else if (from[i] > to[i]) {
            const step = [...from];
            step[i]--;
            steps.push(step);
        }
    }
    return steps;
}

export function allSteps(from: Address, to: Address): Address[] {
    const steps: Address[] = [];
    for (let i = 0; i < to.length; i++) {
        if (true) {
            const step = [...from];
            step[i]++;
            steps.push(step);
        } else if (true) {
            const step = [...from];
            step[i]--;
            steps.push(step);
        }
    }
    return steps;
}
export function toFlat(addr: Address): FlatAddress {
    return addr.join(",");
}
