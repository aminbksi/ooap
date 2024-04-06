export function isDefined<T>(value: T | undefined | null): value is T {
    return value != undefined;
}

export function sum(a: number, b: number): number {
    return a + b;
}
