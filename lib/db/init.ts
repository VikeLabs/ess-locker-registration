import {db} from "../../lib/db";
import * as fs from "fs";

export function initDB() {
    const ELW_COUNT: number = 309;
    const ECS_COUNT: number = 529;
    const ELW_ID = 1;
    const ECS_ID = 2;

    // clear the database

    fs.unlink("db.sqlite", (err) => {
        console.error(err);
        return false;
    });

    const schemaStmt = fs.readFileSync('schema.sql', 'utf8');
    db.exec(schemaStmt);

    // insert the buildings

    const insertBuilding = db.prepare("INSERT INTO buildings (name) VALUES (?)");

    insertBuilding.run("engineering lab wing");
    insertBuilding.run("engineering computer science");

    // insert the lockers

    const insertLocker = db.prepare("INSERT INTO lockers (building_id, num) VALUES (?,?)");

    let insertCount: number = 0;
    for (let i = 1; i <= ELW_COUNT; i++) {
        insertCount += insertLocker.run(ELW_ID, i).changes;
    }

    for (let i = 1; i <= ECS_COUNT; i++) {
        insertCount += insertLocker.run(ECS_ID, i).changes;
    }

    return insertCount === ELW_COUNT + ECS_COUNT;
}