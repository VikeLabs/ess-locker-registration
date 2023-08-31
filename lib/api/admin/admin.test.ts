import { initDB } from "../../db/init";
import { getLockers, getUsers, getRegistrations, deregisterAll, resolve } from "./admin";
import { register, deregister, report } from "../users/user";

describe("Testing Admin Controller in different scenarios after filling database with lockers", () => { //Will rename this later
    it("fills the biuldings and users tables and return a truthy value ", () => {
        expect(initDB()).toBeTruthy();
    });

    describe("Testing getlockers", () => {
        it("Returns all lockers in ELW and ECS", () => {
            const lockers_list = getLockers();
            expect(lockers_list).toHaveLength(838);
          });
    })

    describe("Testing getusers with no users", () => {
        it("Returns all the name and emails of users in the database", () => {
            const user_list = getUsers();
            expect(user_list).toHaveLength(0);
          });
    })

    describe("Testing getusers with one user", () => {
        it("Returns all the name and emails of users in the database", () => {
            const registrations = register(1, 2, "Chicken Run", "yumyum@uvic.ca", false);
            const user_list = getUsers();
            expect(user_list).toHaveLength(1);
            
          });
    })

    describe("Testing getusers with multiple users", () => {
        it("Returns all the name and emails of users in the database", () => {
            
            for (let i = 65; i <= 90; i++) {
                let name = String.fromCharCode(i)
                let email = String.fromCharCode(i) + "@example.ca"
                let registrations = register(1, i, name, email, false);
            }

            const user_list = getUsers();
            expect(user_list).toHaveLength(27);
          });
    })

    describe("Testing getregistrations with multiple users ", () => {
        it("Returns all the registrations in the database", () => {
            const registration_list = getRegistrations();
            expect(registration_list).toHaveLength(27);
          });
    })

    describe("Testing deregisterall with multiple suers", () => {
        it("Returns number of deregistered lockers", () => {
            const deregistered_list = deregisterAll();
            expect(deregistered_list).toBe(27);
          });
    })

    describe("Testing getregistrations with no users ", () => {
        it("Returns all the registrations in the database", () => {
            const registration_list = getRegistrations();
            expect(registration_list).toHaveLength(0);
          });
    })

    describe("Testing deregisterall with no suers", () => {
        it("Returns number of deregistered lockers", () => {
            const deregistered_list = deregisterAll();
            expect(deregistered_list).toBe(0);
          });
    })

    describe("Testing resolve with a reported locker", () =>{
        it("Resolves the reported locker and returns true", () => {
            const registration = register(1, 27, "Amy Higgins", "amy@example.com", false);
            const reported_locker = report(1, 27);
            const resolution = resolve(1, 27);
            
            expect(resolution).toBe(true);
        })
    })

    describe("Testing resolve with a locker that wasn't reported", () =>{
        it(" Doesn't resolve the locker and returns false", () => {
            const registration = register(1, 30, "Herald White", "herald@example.com", false);
            const resolution = resolve(1, 30);
            
            expect(resolution).toBe(false);
        })
    })

    describe("Testing resolve with a locker that doesn't exist", () =>{
        it("returns false", () => {
            const resolution = resolve(1, 6789);
            
            expect(resolution).toBe(false);
        })
    })

})

