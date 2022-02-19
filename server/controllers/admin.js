import { getDb } from "../db/conn.js";
import pkg from "json2csv";
const { json2csvAsync } = pkg;
import { writeFileSync } from "fs";

export async function resolve(req, res, next) {
    const dbConnect = getDb();
    const filter = {
        building: req.body.building,
        number: parseInt(req.body.number),
        status: 'registered',
        reported: true
    };

    const updateDoc = {
        $set: {
            reported: false,
            updatedAt: new Date()
        }
    };

    dbConnect
        .collection('lockers')
        .updateOne(filter, updateDoc)
        .then(result => {
            if (result.matchedCount === 1) {
                res.json({ msg: "success" });
            } else {
                res.json({ err: "reported locker not found" });
            }
        })
        .catch(err => next(err));
}
export async function getRegisteredLockers(req, res, next) {
    const dbConnect = getDb();
    const filter = {
        status: "registered"
    };

    const registeredLockers = await dbConnect.collection('lockers')
        .find(filter)
        .toArray()
        .catch(err => next(err));

    json2csvAsync(registeredLockers)
        .then(csv => {
            writeFileSync('../files/registeredLockers.csv', csv);

            res.download('../files/regiesteredLockers.csv');
        })
        .catch(err => next(err));
}
export async function getAvailableCount(req, res, next) {
    const dbConnect = getDb();
    const filter = {
        status: "available"
    };

    const count = await dbConnect.collection('lockers')
        .find(filter)
        .count()
        .catch(err => next(err));

    res.json({ availableCount: count });
}