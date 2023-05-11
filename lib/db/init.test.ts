import { initDB } from "./init";
import {db} from "./";
import { ELW_COUNT, ECS_COUNT, ELW_ID, ECS_ID} from "../locker_constants";

describe("initializes database", () => {

    it("returns true", () => {
        expect(initDB()).toBeTruthy();
    });
    
    it("populates buildings and lockers", () => {
        const buildings = db.prepare("SELECT * FROM buildings").all();
        expect(buildings[0].name).toBe("engineering lab wing");
        expect(buildings[1].name).toBe("engineering computer science");

        const lockerStmt = db.prepare("SELECT * FROM lockers WHERE building_id = ?");

        const elwLockers = lockerStmt.all(ELW_ID).map(locker => locker.num);
        expect(elwLockers).toEqual(Array.from({length: ELW_COUNT}, (_, i) => i + 1));

        const ecsLockers = lockerStmt.all(ECS_ID).map(locker => locker.num);
        expect(ecsLockers).toEqual(Array.from({length: ECS_COUNT}, (_, i) => i + 1));
    });

    it("clears users and registrations", () => {
        const usersCountStmt = db.prepare("SELECT COUNT(*) as count FROM users");
        expect(usersCountStmt.get().count).toBe(0);
        
        const registrationsCountStmt = db.prepare("SELECT COUNT(*) as count FROM registrations");
        expect(registrationsCountStmt.get().count).toBe(0);
    });
});
