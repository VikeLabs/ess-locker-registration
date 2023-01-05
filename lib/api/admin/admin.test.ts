import { initDB } from "../../db/init";
import {getLockers, getUsers, getRegistrations, deregisterAll} from "./admin";

describe("Testing Admin Functions", () => {
    it("returns true", () => {
        expect(initDB()).toBeTruthy();
    });

    describe("Testing getlockers", () => {
        it("Returns all lockers in ELW and ECS", () => {
            const lockers_list = getLockers();
            expect(lockers_list).toHaveLength(838);
          });
    })

    describe("Testing getusers", () => {
        it("Returns all the name and emails of users in the database", () => {
            const user_list = getUsers();
            expect(user_list).toHaveLength(0);
          });
    })

    describe("Testing getregistrations", () => {
        it("Returns all the registrations in the database", () => {
            const registration_list = getRegistrations();
            expect(registration_list).toHaveLength(0);
          });
    })

    describe("Testing deregisterall", () => {
        it("Returns number of deregistered lockers", () => {
            const deregistered_list = deregisterAll();
            expect(deregistered_list).toBe(0);
          });
    })

})
