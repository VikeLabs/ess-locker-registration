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

export function resolve(building: number, number: number): boolean {
    try{
        const check  = db.prepare("SELECT * FROM registrations WHERE building_id = ? and num = ?").get(building, number)

        if(!check.reported_at){
            return false
        }

        const statement = db.prepare("UPDATE registrations SET reported_at = ? WHERE building_id = ? and num = ? ")
        const info = statement.run(null, building, number)

        return (info.changes > 0)
    }
    catch(error){
        return false
    }
}