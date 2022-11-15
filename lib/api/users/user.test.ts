import { getlockers, register, deregister } from "./user";

describe("building service", () => {
    describe("Testting getlockers", () => {
        it("creates a building", () => {
            const lockers_list = getlockers();
            expect(lockers_list).toHaveLength(838);
          });
    })

})

