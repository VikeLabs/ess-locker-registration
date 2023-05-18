import {db} from "./";
import {ELW_COUNT, ECS_COUNT, ELW_ID, ECS_ID} from "../locker_constants";
import * as fs from "fs";

export function initDB() {
    // clear the database if it exists
    try {
        db.prepare("DROP TABLE lockers").run();
        db.prepare("DROP TABLE buildings").run();
        db.prepare("DROP TABLE users").run();
        db.prepare("DROP TABLE registrations").run();
    } catch (e) {
        // do nothing
    }

    const schema = fs.readFileSync("schema.sql", "utf8");
    db.exec(schema);

    // insert the buildings

    const insertBuilding = db.prepare("INSERT INTO buildings (name) VALUES (?)");

    insertBuilding.run("engineering lab wing");
    insertBuilding.run("engineering computer science");

    // insert the lockers

    let insertLockersStmt = "INSERT INTO lockers (building_id, num) VALUES ";
    for (let i = 1; i <= ELW_COUNT; i++) {
        insertLockersStmt += `(${ELW_ID}, ${i}),`;
    }

    for (let i = 1; i <= ECS_COUNT; i++) {
        insertLockersStmt += `(${ECS_ID}, ${i}),`;
    }

    const insertCount = db.prepare(insertLockersStmt.slice(0, -1)).run().changes;

    return insertCount === ELW_COUNT + ECS_COUNT;
}