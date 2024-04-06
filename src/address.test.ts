import { describe, expect, it } from "@jest/globals";
import { nextSteps } from "./address";

describe("nextSteps", () => {
    it("generates steps for all dimensions", () => {
        const steps = nextSteps([0, 0, 0], [10, 10, 10]);
        expect(steps).toEqual([
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1],
        ]);
    });

    it("generates steps for all dimensions 2", () => {
        const steps = nextSteps([5, 5, 5], [0, 10, 10]);
        expect(steps).toEqual([
            [4, 5, 5],
            [5, 6, 5],
            [5, 5, 6],
        ]);
    });

    it("generates steps for all dimensions - some reached", () => {
        const steps = nextSteps([5, 5, 5], [10, 10, 5]);
        expect(steps).toEqual([
            [6, 5, 5],
            [5, 6, 5],
        ]);
    });

    it("generates steps for all dimensions - target reached", () => {
        const steps = nextSteps([5, 5, 5], [5, 5, 5]);
        expect(steps).toEqual([]);
    });
});
