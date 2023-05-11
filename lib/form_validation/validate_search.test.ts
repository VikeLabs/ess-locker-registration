import validateSearch from "./validate_search";
import { ELW_ID, ELW_COUNT, ECS_ID, ECS_COUNT } from "../locker_constants";

describe("Testing validateSearch with a valid locker", () => {
    it("It should return a truthy value with the minimum values", () => {
        const validate = validateSearch(ELW_ID, 1);
        expect(validate).toBeTruthy();
    });

    it("It should return a truthy value with the maximum values", () => {
        const validate = validateSearch(ECS_ID, ECS_COUNT);
        expect(validate).toBeTruthy();
    });
});

describe("Testing validateSearch with an invalid locker", () => {
    it("It should return a falsy value when the number is too large", () => {
        const validate = validateSearch(ELW_ID, ELW_COUNT + 1);
        expect(validate).toBeFalsy();
    });

    it("It should return a falsy value when the number is too small", () => {
        const validate = validateSearch(ECS_ID, 0);
        expect(validate).toBeFalsy();
    });
});