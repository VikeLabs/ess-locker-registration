import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../lib/db";

type Building = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const buildings: Building[] = db.prepare("SELECT * FROM buildings").all();
    res.status(200).json(buildings);
    return;
  } else if (req.method === "POST") {
    const { name } = req.body;
    const stmt = db.prepare(
      "INSERT INTO buildings (name,created_at,updated_at) VALUES (?,?,?)"
    );
    const now = new Date().toISOString();
    const info = stmt.run(name, now, now);
    res.status(200).json(info);
    return;
  }
  res.status(405).json({ message: "Method not allowed" });
}
