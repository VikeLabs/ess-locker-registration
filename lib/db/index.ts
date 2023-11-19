import Database from "better-sqlite3";

// use in-memory database for testing purposes, otherwise use file
export const db = new Database(
  process.env.NODE_ENV === "test" ? ":memory:" : "db.sqlite"
);


