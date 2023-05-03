import { initDB } from "../../db/init";
import {register, deregister, report } from "./user";

describe("Testing User Controller in different scenarios after filling database with lockers", () => {
    it("fills the biuldings and users tables and return a truthy value", () => {
        expect(initDB()).toBeTruthy();
    });

    describe("Testing register with an existing locker and a non-existent user", () => {
        it("It registers a locker and should return a truthy value", () => {
            const registrations = register(1, 2, "Chicken Run", "yumyum@uvic.ca", false);
            expect(registrations).toBe(true);
          });
    })

    describe("Testing register with an existing locker and an existing user", () => {
        it("It should register the locker and should return a truthy value", () => {
            const registrations = register(2, 22, "Chicken Run", "yumyum@uvic.ca", false);
            expect(registrations).toBe(true);
          });
    })

    describe("Testing register with a registered existing locker and a non-existent user", () => {
        it("It should not register an already registered locker and should return a falsy value", () => {
            const registrations = register(1, 2, "Darla Dupe", "Dish@gmail.com", false);
            expect(registrations).toBe(false);
          });
    })

    describe("Testing register with a non-existent (invalid) locker", () => {
        it("It should not register a non-existent locker and should return a falsy value", () => {
            const registrations = register(1, 900, "Darla Dupe", "Dish@gmail.com", false);
            expect(registrations).toBe(false);
          });
    })

    describe("Testing register with email restriction on and a restricted email address", () => {
        it("It should not register a restricted email should return a falsy value", () => {
            const registrations = register(2, 100, "Darla Dupe", "Dish@gmail.com", true);
            expect(registrations).toBe(false);
          });
    })

    describe("Testing register with email restriction on and a restricted email address", () => {
        it("It should register a restricted email should return a truthy value", () => {
            const registrations = register(2, 101, "Darla Dupe", "dish@uvic.ca", true);
            expect(registrations).toBe(true);
          });
    })

    describe("Testing search with a registered locker", () => {
        it("It searches the database and returns a registration object indicating the locker is not available", () =>{
            const row = search(2, 101)
            expect(row).toHaveProperty('building_id', 2)
            expect(row).toHaveProperty('num', 101)
            expect(row).toHaveProperty('reported_at', null)
            expect(row).toHaveProperty('available', false)

        })
    })

    describe("Testing search with a valid and uregistered locker", () => {
        it("It searches the database and returns a registration object indicating the locker is not available", () =>{
            const row = search(1, 200)
            expect(row).toHaveProperty('building_id', 1)
            expect(row).toHaveProperty('num', 200)
            expect(row).toHaveProperty('reported_at', null)
            expect(row).toHaveProperty('available', true)
            
        })
    })

    describe("Testing search with an invalid locker", () => {
        it("It searches the database and returns null", () =>{
            const row = search(1, 1000)
            expect(row).toBe(null)
        })
    })

    describe("Testing deregister with an existing user and a locker they registered", () => {
        it("It deregisters a locker and should return a truthy value", () => {
            const deregistrations = deregister(1, 2, "Chicken Run", "yumyum@uvic.ca");
            expect(deregistrations).toBe(true);
          });
    })

    describe("Testing deregister with a non-existent user", () => {
        it("It deregisters a locker and should return a falsy value", () => {
            const deregistrations = deregister(1, 2, "Polly", "yumyum@uvic.ca");
            expect(deregistrations).toBe(false)
          });
    })

    describe("Testing deregister with an existing user and a locker they didn't register ", () => {
        it("It deregisters a locker and should return a falsy value", () => {
            const registrations = register(1, 2, "Chicken Run", "yumyum@uvic.ca", false);
            const deregistrations = deregister(1, 34, "Chicken Run", "yumyum@uvic.ca");
            expect(deregistrations).toBe(false)
          });
    })

    describe("Testing report on a registered locker", ()=>{
        it("It updates the reported_at date for the registration with the locker", () => {
            const registrations = register(1, 5, "Chicken Run", "yumyum@uvic.ca", false);
            const reported_val = report(1, 5);
            expect(reported_val).toBe(true)
        })
    })

    describe("Testing report on a non-existent locker", ()=>{
        it("It should return a falsy value since the locker doesn't exist", () => {
            const reported_val = report(1, 400);
            expect(reported_val).toBe(false)
        })
    })

    describe("Testing report on an unclaimed locker", ()=>{
        it("It shoudl return a falsy value since the locker is unclaimed", () => {
            const reported_val = report(1, 100);
            expect(reported_val).toBe(false)
        })
    })

})
