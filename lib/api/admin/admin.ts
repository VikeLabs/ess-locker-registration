import { stat } from "fs";
import { db} from "../../db";
import { ReportedLocker } from "../../types";

export function getLockers() {
    return db.prepare("SELECT * FROM lockers").all()
}

export function getUsers() {
    return db.prepare("SELECT * FROM users").all()
}

export function getRegistrations() {
    const statement = `SELECT registrations.building_id, registrations.num, users.name, users.email, registrations.reported_at
            FROM registrations
            INNER JOIN users ON registrations.user_id = users.id`;
    return db.prepare(statement).all();
}

export function getReportedLockers(): ReportedLocker[] {
    const statement = `SELECT registrations.building_id, registrations.num, users.name, users.email, registrations.reported_at
            FROM registrations
            INNER JOIN users ON registrations.user_id = users.id
            WHERE registrations.reported_at NOT NULL
            ORDER BY registrations.reported_at DESC`;
    let reportedLockers = db.prepare(statement).all();
    for (let i = 0; i < reportedLockers.length; i++) {
        reportedLockers[i].reported_at = new Date(reportedLockers[i].reported_at);
    }
    return reportedLockers;
}

export function deregisterAll(){
    const stmt = db.prepare("DELETE FROM registrations").run()
    return stmt.changes
}

