import { getDb } from "../db/conn.js";
import { parseAsync } from "json2csv";
import { writeFile } from "fs";

async function jsonToCSVFile (data, fileName) {
    const fields = Object.keys(data[0]);
    const opts = { fields };
    let success = true;

    return new Promise((resolve, reject) => {
        parseAsync(data, opts)
            .then(async csv => {
                writeFile(fileName, csv, err => {
                    if (!err) {
                        resolve()
                    } else {
                        reject(err);
                    }
                });
            })
            .catch(err => reject(err));
    })
}

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

export async function downloadRegisteredLockers(req, res, next) {
    const dbConnect = getDb();
    const filter = {
        status: 'registered'
    };

    const options = {
        projection: {
            _id: 0,
            building: 1,
            number: 1,
            user: 1,
            userEmail: 1,
            status: 1,
            reported: 1
        }
    };

    const registeredLockers = await dbConnect.collection('lockers')
        .find(filter, options)
        .toArray()
        .catch(err => next(err));

    const fields = Object.keys(registeredLockers[0]);
    const opts = { fields };

    const csv = await parseAsync(registeredLockers, opts)
        .catch(err => next(err));
    
    const fileName = './files/registered_lockers.csv';

    writeFile(fileName, csv, err => {
        if (err) {
            next(err);
        }

        res.download(fileName);
    });
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