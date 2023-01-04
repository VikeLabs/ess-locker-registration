import { db} from "../../db";

export function getlockers() {
    return db.prepare("SELECT * FROM lockers").all(); // Returns array of all locker row objects in the 'locker' table
}

export function register(building: number, number: number, name: string, email: string) {

    const user_statement = db.prepare("INSERT INTO users (name, email) VALUES(?, ?)").run(name, email)
    const statement = db.prepare("INSERT INTO registrations (building_id, num, reported_at, user_id) VALUES (?, ?, ?, ?)")

    const info = statement.run(building, number, Date.now(), user_statement.lastInsertRowid)
    return info.lastInsertRowid
}


export function deregister(building: number, number: number) {
    const statement = db.prepare("DELETE FROM registrations WHERE building_id = ? AND num = ?")

    const info = statement.run(building, number)
    return info.changes
}
