import {db} from ".";

export default function clearUsersAndRegistrations() {
    const stmt = db.prepare("DELETE FROM registrations").run();
    const stmt2 = db.prepare("DELETE FROM users").run();

    // reset the autoincrement
    db.prepare("DELETE FROM sqlite_sequence WHERE NAME='lockers'").run();

    const numRegistrations = db.prepare("SELECT COUNT(*) FROM registrations").get()["COUNT(*)"];
    const numUsers = db.prepare("SELECT COUNT(*) FROM users").get()["COUNT(*)"];

    return numRegistrations === 0 && numUsers === 0;
}