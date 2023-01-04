import { initDB } from "../../db/init";
import { getlockers, register, deregister } from "./user";

describe("Testing User Functions", () => {
    it("returns true", () => {
        expect(initDB()).toBeTruthy();
    });

    describe("Testing getlockers", () => {
        it("Returns all lockers in ELW and ECS", () => {
            const lockers_list = getlockers();
            expect(lockers_list).toHaveLength(838);
          });
    })

    describe("Testing register", () => {
        it("It registers a locker and should return the number of registered lockers in the database", () => {
            const lastUpdatedID = register(1, 2, "Toni David", "yumyum@uvic.ca");
            expect(lastUpdatedID).toBe(1);
          });
    })

    describe("Testing deregister", () => {
        it("It deregisters a locker and should return the number of deregistered lockers in the database", () => {
            const num_deregistered = deregister(1, 2);
            expect(num_deregistered).toBe(1);
          });
    })

})

