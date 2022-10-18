import {db} from "../../lib/db";

export function initDB() {
    const inELW: number = 309;
    const inECS: number = 529;

    // clear the database

    const clearBuildings = db.prepare("DELETE FROM buildings");
    const clearLockers = db.prepare("DELETE FROM lockers");
    const clearUsers = db.prepare("DELETE FROM users");
    const clearRegistrations = db.prepare("DELETE FROM registrations");

    clearBuildings.run();
    clearLockers.run();

    // insert the buildings

    const insertBuilding = db.prepare("INSERT INTO buildings (name) VALUES (?)");

    insertBuilding.run("engineering lab wing");
    insertBuilding.run("engineering computer science");

    // insert the lockers

    const insertLocker = db.prepare("INSERT INTO lockers (building_id, num) VALUES (?,?)");

    let insertCount: number = 0;
    for (let i = 1; i <= inELW; i++) {
        insertCount += insertLocker.run(1, i).changes;
    }

    for (let i = 1; i <= inECS; i++) {
        insertCount += insertLocker.run(2, i).changes;
    }

    return insertCount === inELW + inECS;
}