import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../lib/db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const lockers = db.prepare("SELECT * FROM lockers").all();
    res.status(200).json(lockers);
    return;
  } else if (req.method === "POST") {
    const { name } = req.body;
    const stmt = db.prepare(
      `INSERT INTO lockers (name,created_at,updated_at) VALUES (?,?,?)`
    );
    const now = new Date().toISOString();
    const info = stmt.run(name, now, now);
    res.status(200).json(info);
    return;
  }
}
