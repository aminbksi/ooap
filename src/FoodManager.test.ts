import { describe, expect, it } from "@jest/globals";
import { FoodManager } from "./FoodManager";

describe("FoodManager", () => {
    it("returns closest food", () => {
        const fm = new FoodManager();
        fm.addFood([1, 1, 1]);
        fm.addFood([2, 2, 2]);
        expect(fm.getClosest([0, 0, 0])[0]?.address).toEqual([1, 1, 1]);
    });
});
