import { db} from "../../db";

export function getlockers() {
    return db.prepare("SELECT * FROM lockers").all()
}

export function getusers() {
    return db.prepare("SELECT * FROM users").all()
}

export function getregistrations() {
    return db.prepare("SELECT * FROM registrations").all()
}

export function deregisterall(){
    return db.prepare("DELETE FROM registrations").run()
}
