import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

export function connectToServer(callback) {
  client.connect((err, db) => {
    if (err || !db) {
      return callback(err);
    }

    dbConnection = db.db("lockerdb");
    console.log("Successfully connected to MongoDB.");

    return callback();
  });
}
export function getDb() { return dbConnection; }