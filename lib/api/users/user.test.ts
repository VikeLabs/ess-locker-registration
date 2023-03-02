import { initDB } from "../../db/init";
import {register, deregister, report } from "./user";

describe("Testing User Controller in different scenarios after filling database with lockers", () => {
    it("returns true", () => {
        expect(initDB()).toBeTruthy();
    });

    describe("Testing register with an existing locker and a non-existent user", () => {
        it("It registers a locker and should return a truthy value", () => {
            const registrations = register(1, 2, "Chicken Run", "yumyum@uvic.ca");
            expect(registrations).toBe(true);
          });
    })

    describe("Testing register with an existing locker and an existing user", () => {
        it("It should register the locker and should return a truthy value", () => {
            const registrations = register(2, 22, "Chicken Run", "yumyum@uvic.ca");
            expect(registrations).toBe(true);
          });
    })

    describe("Testing register with a registered existing locker and a non-existent user", () => {
        it("It should not register an already registered locker and should return a falst value", () => {
            const registrations = register(1, 2, "Darla Dupe", "Dish@gmail.com");
            expect(registrations).toBe(false);
          });
    })

    describe("Testing deregister with an existing user", () => {
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
            const registrations = register(1, 2, "Chicken Run", "yumyum@uvic.ca");
            const deregistrations = deregister(1, 34, "Chicken Run", "yumyum@uvic.ca");
            expect(deregistrations).toBe(false)
          });
    })

    describe("Testing report on an existing locker", ()=>{
        it("It updates the reported_at date for the registration with the locker", () => {
            const registrations = register(1, 5, "Chicken Run", "yumyum@uvic.ca");
            const reported_val = report(1, 5);
            expect(reported_val).toBe(true)
        })
    })

    describe("Testing report on a non-existent locker", ()=>{
        it("It reports locker that hasn't been claimed", () => {
            const reported_val = report(1, 400);
            expect(reported_val).toBe(false)
        })
    })

})
