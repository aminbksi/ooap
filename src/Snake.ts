import { Split } from "./action";
import { Address } from "./common";

export class Snake {
    segments: Address[];
    name: string;
    kidcount = 0;
    target: Address | undefined;

    constructor(name: string, segments: Address[]) {
        console.log(
            "creating new snake",
            name,
            segments[segments.length - 1],
            segments.length
        );
        this.segments = segments;
        this.name = name;
    }

    get length() {
        return this.segments.length;
    }

    get head(): Address {
        return this.segments[this.segments.length - 1];
    }

    private getNextKidName(): string {
        return `${this.name}_${this.kidcount++}`;
    }

    /**
     * Return 'virtual' tail snake.
     * Does not modify existing snake.
     */
    getKid(kidLength: number): Snake {
        const kidSegments = this.segments.slice(0, kidLength);
        return new Snake(this.getNextKidName(), kidSegments);
    }

    applyMove(newLocation: Address, grow: boolean): void {
        this.segments.push(newLocation);
        if (!grow) {
            this.segments.shift();
        }
    }

    applySplit(action: Split, growKid: boolean): Snake {
        const kidSegments = this.segments.slice(0, action.snakeSegment);
        this.segments.splice(0, action.snakeSegment);
        const kid = new Snake(action.newSnakeName, kidSegments);
        kid.applyMove(action.nextLocation, growKid);
        return kid;
    }

    log(msg: string, ...args: any[]): void {
        console.log(`[${this.name}:${this.length}] ${msg}`, ...args);
    }
}
