import { db} from "../../db";

export function getlockers() {
    return db.prepare("SELECT * FROM lockers").get()
}

export function getusers() {
    return db.prepare("SELECT * FROM users").get()
}

export function getregistrations() {
    return db.prepare("SELECT * FROM registrations").get()
}

export function deregisterall(){
    const statement = db.prepare("DELETE FROM registrations").get()
}
