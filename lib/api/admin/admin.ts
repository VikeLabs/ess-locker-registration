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

export function register(building: number, number: number, name: string, email: string):boolean {

    try{

        const user_statement = db.prepare("INSERT INTO users (name, email) VALUES(?, ?)").run(name, email)
        const statement = db.prepare("INSERT INTO registrations (building_id, num, reported_at, user_id) VALUES (?, ?, ?, ?)")

        const info = statement.run(building, number, null, user_statement.lastInsertRowid)
        return (info.changes > 0)
    }
    catch(error){

        return(false)

    }
}

export function deregister(building: number, number: number, name: string, email: string):boolean { // Add comments explaining why function would be false

    try{
        const user = db.prepare("SELECT id FROM users WHERE name = ? AND email = ?").get(name, email)
        
        const statement = db.prepare("DELETE FROM registrations WHERE building_id = ? AND num = ? AND user_id = ?")
        const info = statement.run(building, number, user.id)

        return (info.changes > 0)
    }
    catch(error){
        return (false)
    }
    
}
