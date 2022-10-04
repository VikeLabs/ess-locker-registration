import { MongoClient, Db } from "mongodb";

// grab connection string from environment or use default
const connectionString = process.env.ATLAS_URI ?? "mongodb://localhost:27017";

const _client = new MongoClient(connectionString, {
  // these properties not to be found now
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
});

// for caching the connection
let db: Db | null = null;

// export a singleton instance of the database
// use this by importing it in other files
export const client = async (name: string) => {
  // if we already have a connection, return it
  if (!db) {
    // connect to the database
    await _client.connect();
    // cache the connection
    db = _client.db(name);
  }
  return db;
};
