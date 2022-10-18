import Database from "better-sqlite3";

export const ELW_COUNT = 309;
export const ECS_COUNT = 529;
export const ELW_ID = 1;
export const ECS_ID = 2;

// use in-memory database for testing purposes, otherwise use file
export const db = new Database(
  process.env.NODE_ENV === "test" ? ":memory:" : "db.sqlite"
);
