import { initDB } from "./init";
import {db} from "./";

describe("initializes database", () => {

    it("returns true", () => {
        expect(initDB()).toBeTruthy();
    });
    
    it("populates buildings and lockers", () => {
        const ELW_COUNT = 309;
        const ECS_COUNT = 529;
        const ELW_ID = 1;
        const ECS_ID = 2;

        initDB();

        const buildings = db.prepare("SELECT * FROM buildings").all();
        expect(buildings[0].name).toBe("engineering lab wing");
        expect(buildings[1].name).toBe("engineering computer science");

        const elwLockers = db.prepare("SELECT num FROM lockers WHERE building_id=" + ELW_ID)
                .all().map(locker => locker.num);
        expect(elwLockers).toEqual(Array.from({length: ELW_COUNT}, (_, i) => i + 1));

        const ecsLockers = db.prepare("SELECT num FROM lockers WHERE building_id=" + ECS_ID)
                .all().map(locker => locker.num);
        expect(ecsLockers).toEqual(Array.from({length: ECS_COUNT}, (_, i) => i + 1));
    });

    it("clears users and registrations", () => {
        initDB();

        const usersCountStmt = db.prepare("SELECT COUNT(*) FROM users");
        const usersCount = usersCountStmt.get()["COUNT(*)"];

        const registrationsCountStmt = db.prepare("SELECT COUNT(*) FROM registrations");
        const registrationsCount = registrationsCountStmt.get()["COUNT(*)"];

        expect(usersCount + registrationsCount).toBe(0);
    });
});
