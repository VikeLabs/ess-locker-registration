import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../lib/db/mongo";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  // get instance of database named "test"
  const db = await client("test");
  // get collection named "lockers"
  const collection = db.collection("lockers");
  // get all documents in the collection and return them as an array
  const result = await collection.find({}).toArray();
  // return the array of documents as JSON
  res.status(200).json(result);
}
