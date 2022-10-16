// setup sqlite3 table for testing
const { db } = require("./lib/db");
const fs = require("fs");

const schema = fs.readFileSync("./schema.sql").toString();

beforeAll(() => {
  // create tables from schema
  db.exec(schema);
});
