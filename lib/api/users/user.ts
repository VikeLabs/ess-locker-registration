import { db} from "../../db";

export function register(building: number, number: number, name: string, email: string) {

    const user_statement = db.prepare("INSERT INTO users (name, email) VALUES(?, ?)").run(name, email)
    const statement = db.prepare("INSERT INTO registrations (building_id, num, reported_at, user_id) VALUES (?, ?, ?, ?)")

    const info = statement.run(building, number, Date.now(), user_statement.lastInsertRowid)
    return info.lastInsertRowid
}


export function deregister(building: number, number: number, name: string, email: string) {
    const user = db.prepare("SELECT id FROM users WHERE name = ? AND email = ?").get(name, email)
    const statement = db.prepare("DELETE FROM registrations WHERE building_id = ? AND num = ? AND user_id = ?")

    const info = statement.run(building, number, user.id)
    return info.changes
}
