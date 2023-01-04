import { initDB } from "../../db/init";
import {getlockers, getusers, getregistrations, deregisterall} from "./admin";

describe("Testing Admin Functions", () => {
    it("returns true", () => {
        expect(initDB()).toBeTruthy();
    });

    describe("Testing getlockers", () => {
        it("Returns all lockers in ELW and ECS", () => {
            const lockers_list = getlockers();
            expect(lockers_list).toHaveLength(838);
          });
    })

    describe("Testing getusers", () => {
        it("Returns all the name and emails of users in the database", () => {
            const user_list = getusers();
            expect(user_list).toHaveLength(0);
          });
    })

    describe("Testing getregistrations", () => {
        it("Returns all the registrations in the database", () => {
            const registration_list = getregistrations();
            expect(registration_list).toHaveLength(0);
          });
    })

    describe("Testing deregisterall", () => {
        it("Returns an array of all the deregistered lockers", () => {
            const deregistered_list = deregisterall();
            expect(deregisterall).toHaveLength(0);
          });
    })

})
