import { initDB } from "./init";

describe("initializes database", () => {
    it("initializes the database", () => {
        expect(initDB()).toBe(true);
    });
});
