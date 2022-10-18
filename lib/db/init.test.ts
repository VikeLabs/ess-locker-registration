import { initDB } from "./init";
import {db} from "./";

describe("initializes database", () => {
    const success = initDB();

    it("returns true", () => {
        expect(success).toBeTruthy();
    });
    
    it("populates buildings and lockers", () => {
        const ELW_COUNT = 309;
        const ECS_COUNT = 529;

        const buildings = db.prepare("SELECT * FROM buildings").all();
        expect(buildings[0].name).toBe("engineering lab wing");
        expect(buildings[1].name).toBe("engineering computer science");

        const lockers = db.prepare("SELECT * FROM lockers").all();
        expect(lockers.length).toBe(ELW_COUNT + ECS_COUNT);
    });

    it("clears users and registrations", () => {
        const usersCountStmt = db.prepare("SELECT COUNT(*) FROM users");
        const usersCount = usersCountStmt.get();

        const registrationsCountStmt = db.prepare("SELECT COUNT(*) FROM registrations");
        const registrationsCount = registrationsCountStmt.get();
        expect(usersCount + registrationsCount).toBe(0);
    });
});
