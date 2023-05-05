import { db} from "../../db";

const email_restriction = (email_address: string) =>{
    const re = /^[A-Za-z0-9]+@uvic.ca$/;
    
    return re.test(email_address); 
}

export function register(building: number, number: number, name: string, email: string, restrict_email:boolean):boolean {
    try{
        if (restrict_email){
            const email_check = email_restriction(email)
            if (!email_check){
                return false                
            }
        }
        
        let user_statement = db.prepare("INSERT INTO users (name, email) VALUES(?, ?)").run(name, email)
        
        const statement = db.prepare("INSERT INTO registrations (building_id, num, reported_at, user_id) VALUES (?, ?, ?, ?)")

        const info = statement.run(building, number, null, user_statement.lastInsertRowid)
        return (info.changes > 0)
    }
    catch(error){

        return false
    }
}

export function deregister(building: number, number: number, name: string, email: string):boolean {
    try{
        const user = db.prepare("SELECT id FROM users WHERE name = ? AND email = ?").get(name, email)
        const statement = db.prepare("DELETE FROM registrations WHERE building_id = ? AND num = ? AND user_id = ?")
        const info = statement.run(building, number, user.id)

        return (info.changes > 0)
    }
    catch(error){

        return false
    }
    
}

export function report(building: number, number: number) {
    try{
        const statement = db.prepare("UPDATE registrations SET reported_at = ? WHERE building_id = ? and num = ? ")
        const info = statement.run(Date.now(), building, number)

        return (info.changes > 0)
    }
    catch(error){
        return false
    }
    
}