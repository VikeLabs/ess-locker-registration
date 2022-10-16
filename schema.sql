-- Engine: sqlite3
CREATE TABLE buildings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL
);

CREATE TABLE lockers (
    building_id INTEGER NOT NULL,
    num INTEGER NOT NULL,
    PRIMARY KEY (building_id, num)
);

CREATE TABLE registrations (
    building_id INTEGER NOT NULL,
    num INTEGER NOT NULL,
    reported_at DATETIME,
    user_id INTEGER NOT NULL,
    PRIMARY KEY (building_id, num),
    FOREIGN KEY (building_id, num) REFERENCES lockers (building_id, num),
    FOREIGN KEY (user_id) REFERENCES users (id)
);