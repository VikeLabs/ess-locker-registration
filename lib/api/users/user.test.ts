import { initDB } from "../../db/init";
import {register, deregister } from "./user";

describe("Testing User Functions", () => {
    it("returns true", () => {
        expect(initDB()).toBeTruthy();
    });

    describe("Testing register", () => {
        it("It registers a locker and should return the number of registered lockers in the database", () => {
            const lastUpdatedID = register(1, 2, "Toni David", "yumyum@uvic.ca");
            expect(lastUpdatedID).toBe(1);
          });
    })

    describe("Testing deregister", () => {
        it("It deregisters a locker and should return the number of deregistered lockers in the database", () => {
            const num_deregistered = deregister(1, 2, "Toni David", "yumyum@uvic.ca");
            expect(num_deregistered).toBe(1);
          });
    })

})

