import { db } from "../db";

type Building = {
  id: number;
  name: string;
};

export function createBuilding(name: string): number | bigint {
  // create a prepared statement to insert a new building
  const stmt = db.prepare("INSERT INTO buildings (name) VALUES (?)");
  // pass the name to the prepared statement and run it
  const info = stmt.run(name);
  // return the id of the newly created building
  return info.lastInsertRowid;
}

export function getBuildings(): Building[] {
  return db.prepare("SELECT * FROM buildings").all();
}

export function deleteBuildingById(id: number): void {
  db.prepare("DELETE FROM buildings WHERE id = ?").run(id);
}
