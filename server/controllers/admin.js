import { getDb } from "../db/conn.js";
import { parseAsync } from "json2csv";
import { writeFile } from "fs";
import { promisify } from "util";

const writeFileProm = promisify(writeFile);

// unreports a locker, given its building and number
export async function resolve(req, res, next) {
    // set up update options
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

    // unreport locker
    const result = await dbConnect
        .collection('lockers')
        .updateOne(filter, updateDoc)
        .catch(err => next(err));

    // send response
    if (result.matchedCount === 1) {
        res.json({ msg: "success" });
    } else {
        res.json({ err: "reported locker not found" });
    }
}

// download csv of all registered lockers
export async function downloadRegisteredLockers(req, res, next) {
    // set up query
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
            reported: 1
        }
    };

    // get all registered lockers as an array of docs
    const registeredLockers = await dbConnect
        .collection('lockers')
        .find(filter, options)
        .toArray()
        .catch(err => next(err));

    // convert doc array to csv
    const fields = Object.keys(registeredLockers[0]);
    const opts = { fields };

    const csv = await parseAsync(registeredLockers, opts)
        .catch(err => next(err));
    
    // write csv to file
    const fileName = './files/registered_lockers.csv';

    await writeFileProm(fileName, csv)
        .catch();

    // send file to client and prompt download
    res.download(fileName);
}

// counts the number of available lockers
export async function getAvailableCount(req, res, next) {
    // set up query
    const dbConnect = getDb();
    const filter = {
        status: "available"
    };

    // count available lockers
    const count = await dbConnect
        .collection('lockers')
        .find(filter)
        .count()
        .catch(err => next(err));

    // send count to user
    res.json({ availableCount: count });
}