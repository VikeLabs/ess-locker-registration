import {getlockers, deregisterall, getregistrations, getusers} from "./admin";

describe("building service", () => {
    describe("Testing getlockers", () => {
        it("creates a building", () => {
            const lockers_list = getlockers();
            expect(lockers_list).toHaveLength(838);
          });
    })

})
