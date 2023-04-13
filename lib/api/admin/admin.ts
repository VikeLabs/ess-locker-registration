import { db} from "../../db";

export function getLockers() {
    return db.prepare("SELECT * FROM lockers").all()
}

export function getUsers() {
    return db.prepare("SELECT * FROM users").all()
}

export function getRegistrations() {
    return db.prepare("SELECT * FROM registrations").all()
}

export function deregisterAll(){
    const stmt = db.prepare("DELETE FROM registrations").run()
    return stmt.changes
}

