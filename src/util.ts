export function isDefined<T>(value: T | undefined | null): value is T {
    return value != undefined;
}

export function sum(a: number, b: number): number {
    return a + b;
}

export function pickRandom<T>(values: T[]): T | undefined {
    if (values.length === 0) {
        return undefined;
    }
    return values[random(0, values.length - 1)];
}

export function random(from: number, to: number): number {
    return Math.trunc(Math.random() * (to - from) + from);
}
