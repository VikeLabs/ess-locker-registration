import {db} from "./";
import {ELW_COUNT, ECS_COUNT, ELW_ID, ECS_ID} from "../locker_constants";
import * as fs from "fs";

export function initDB() {
    const schema = fs.readFileSync("schema.sql", "utf8");
    
    // try to create the tables
    try {
        db.exec(schema);
    } catch (e) {
        // do nothing
    }

    db.prepare("DELETE FROM registrations;").run();
    db.prepare("DELETE FROM lockers;").run();
    db.prepare("DELETE FROM users;").run();

    // reset the autoincrement
    db.prepare("DELETE FROM sqlite_sequence WHERE NAME='lockers'").run();

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