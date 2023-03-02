import { initDB } from "../../db/init";
import {getLockers, getUsers, getRegistrations, deregisterAll, register, deregister} from "./admin";

describe("Testing Admin Controller in different scenarios after filling database with lockers", () => { //Will rename this later
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

    describe("Testing register with an existing locker and a non-existent user", () => {
        it("Should register a new locker using the provided name, email and locker", () => {
            const registrations = register(1, 34, "Chicken Run", "Take@gmail.com");
            expect(registrations).toBe(true);
          });
    })

    describe("Testing register with a registered existing locker and a non-existent user", () => {
        it("Should not register an already registered locker using the provided name, email and locker", () => {
            const registrations = register(1, 34, "Darla Dupe", "Dish@gmail.com");
            expect(registrations).toBe(false);
          });
    })

    describe("Testing getregistrations", () => {
        it("Returns all the registrations in the database", () => {
            const registration_list = getRegistrations();
            expect(registration_list).toHaveLength(1);
          });
    })

    describe("Testing deregisterall", () => {
        it("Returns number of deregistered lockers", () => {
            const deregistered_list = deregisterAll();
            expect(deregistered_list).toBe(1);
          });
    })

})
