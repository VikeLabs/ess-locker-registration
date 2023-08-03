import { initDB } from "../../db/init";
import clearUsersAndRegistrations from "../../db/clearUsersAndRegistrations";
import { getLockers, getUsers, getRegistrations, deregisterAll, getReportedLockers } from "./admin";
import { register, deregister, report } from "../users/user";
import { ECS_ID, ELW_ID } from "../../locker_constants";
import { ReportedLocker } from "../../types";
import { clear } from "console";

beforeAll(() => {
    initDB();
});

beforeEach(() => {
    clearUsersAndRegistrations();
});

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
        
        it("Returns the correct name and email of the user in the database", () => {
            const registrations = register(1, 2, "Chicken Run", "yumyum@uvic.ca", false);
            const user_list = getUsers();
            expect(user_list[0].name).toBe("Chicken Run");
            expect(user_list[0].email).toBe("yumyum@uvic.ca");
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
            expect(user_list).toHaveLength(26);
          });
    })

    describe("getRegistrations with one user", () => {
        it("Returns the correct properties of the user", () => {
            register(ELW_ID, 100, "Name Name", "email@email.com", false);
            report(ELW_ID, 100)

            expect(getRegistrations()).toHaveLength(1);
            expect(getRegistrations()[0].building_id).toBe(ELW_ID);
            expect(getRegistrations()[0].num).toBe(100);
            expect(getRegistrations()[0].name).toBe("Name Name");
            expect(getRegistrations()[0].email).toBe("email@email.com");
            expect(getRegistrations()[0].reported_at).toBeDefined();
        });
    })

    describe("Testing getregistrations with multiple users ", () => {
        it("Returns all the registrations in the database", () => {
            for (let i = 65; i <= 90; i++) {
                let name = String.fromCharCode(i)
                let email = String.fromCharCode(i) + "@example.ca"
                register(ECS_ID, i, name, email, false);
            }

            const registration_list = getRegistrations();
            expect(registration_list).toHaveLength(26);
          });
    })

    describe("Testing deregisterall with multiple suers", () => {
        it("Returns number of deregistered lockers", () => {
            for (let i = 65; i <= 90; i++) {
                let name = String.fromCharCode(i)
                let email = String.fromCharCode(i) + "@example.ca"
                register(ECS_ID, i, name, email, false);
            }

            const deregistered_list = deregisterAll();
            expect(deregistered_list).toBe(26);
          });
    })

    describe("Testing getregistrations with no users ", () => {
        it("Returns all the registrations in the database", () => {
            const registration_list = getRegistrations();
            expect(registration_list).toHaveLength(0);
          });
    })

    describe("Testing deregisterall with no users", () => {
        it("Returns number of deregistered lockers", () => {
            const deregistered_list = deregisterAll();
            expect(deregistered_list).toBe(0);
          });
    })

    test("getReportedLockers returns empty list when there are no registrations", () => {
        expect(getReportedLockers()).toHaveLength(0);
    });

    test("getReportedLockers returns empty list when there are no reported lockers", () => {
        for (let i = 65; i <= 90; i++) {
            let name = String.fromCharCode(i)
            let email = String.fromCharCode(i) + "@example.ca"
            register(ECS_ID, i, name, email, false);
        }

        expect(getReportedLockers()).toHaveLength(0);
    });

    test("getReportedLockers returns correct type", () => {
        register(ECS_ID, 1, "John Doe", "johnd@email.com", false);
        report(ECS_ID, 1);

        const reportedLockers = getReportedLockers();
        expect(getReportedLockers()).toHaveLength(1);
        expect(getReportedLockers()[0].building_id).toBe(ECS_ID);
        expect(getReportedLockers()[0].num).toBe(1);
        expect(getReportedLockers()[0].name).toBe("John Doe");
        expect(getReportedLockers()[0].email).toBe("johnd@email.com");
        expect(getReportedLockers()[0].reported_at).toBeInstanceOf(Date);
    });

    test("getReportedLockers returns the most recently reported lockers first", async () => {
        register(ECS_ID, 1, "John Doe", "johnd@email.com", false);
        report(ECS_ID, 1);
        register(ECS_ID, 2, "Jane Doe", "janed@email.com", false);
        await new Promise(resolve => setTimeout(resolve, 2));
        report(ECS_ID, 2);

        const reportedLockers = getReportedLockers();
        expect(reportedLockers).toHaveLength(2);
        expect(reportedLockers[0].name).toBe("Jane Doe");
    });
});
