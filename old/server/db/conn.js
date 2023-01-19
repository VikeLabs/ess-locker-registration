import { MongoClient } from "mongodb";

// grab connection string from environment
const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

// connect to server
export function connectToServer() {
  return new Promise(async (resolve, reject) => {
    try {
      // connect to database
      const db = await client.connect();

      // confirm connection
      dbConnection = db.db("lockers");
      console.log("Successfully connected to MongoDB.");
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

// get connection
export function getDb() { return dbConnection; }