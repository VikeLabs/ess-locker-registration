import { getDb } from "../db/conn.js";
import { parseAsync } from "json2csv";
import { writeFile } from "fs";

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
        .then(registeredLockers => {

            const fields = ['building', 'number', 'user', 'user email', 'status', 'reported'];
            const opts = { fields };

            console.log(registeredLockers);
            
            parseAsync(registeredLockers, opts)
                .then(csv => {
                    writeFile('./files/registered_lockers.csv', csv, { flag: "w+" }, err => {
                        if (err) {
                            next(err);
                        }
        
                        res.download('./files/registered_lockers.csv');
                    });
                })
                .catch(err => next(err));
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