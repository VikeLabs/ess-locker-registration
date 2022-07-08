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

// counts the number of total, available, and registered lockers
export async function count(req, res, next) {
    // set up query
    const dbConnect = getDb();
    const availableFilter = {
        status: "available"
    };

    const registeredFilter = {
        status: "registered"
    };

    // count lockers
    const availableCount = await dbConnect
        .collection('lockers')
        .countDocuments(availableFilter);

        
    const registeredCount = await dbConnect
        .collection('lockers')
        .countDocuments(registeredFilter);

            
    const totalCount = await dbConnect
        .collection('lockers')
        .countDocuments();

    // send count to user

    const data = {
        availableCount: availableCount,
        registeredCount: registeredCount,
        totalCount: totalCount
    };
    res.json(data);
}

// Deregisters a specific locker 
export async function admin_deregister(req, res, next) {
    //connect to database
    const dbConnect = getDb();

    // filters all lockers using the building and number
    const filter = {
        building: req.body.building,
        number: parseInt(req.body.number)
    };

    //sets the fields that will be updated
    const updateDoc = {
        $set: {
            user: '',
            userEmail: '',
            status: 'available',
            reported: false,
            updatedAt: new Date()
        }
    };

    // deregisters the lockers
    const result = await dbConnect
        .collection('lockers')
        .updateOne(filter, updateDoc)
        .catch(err => {next(err)});


    if (result.modifiedCount === 1){
        res.json({msg: 'Sucessfully deregistered locker'})
    }else{
        res.json({err:'Could not find locker'})
    }
    
}

// Deregisters all lockers
export async function deregister_all(req, res, next) {
    //connect to database
    const dbConnect = getDb();

    // With an empty filter, it updates all documents in the database
    const filter = {};

    //sets the fields that will be updated
    const updateDoc = {
        $set: {
            user: '',
            userEmail: '',
            status: 'available',
            reported: false,
            updatedAt: new Date()
        }
    };

    // deregisters the lockers
    const result = await dbConnect
        .collection('lockers')
        .updateMany(filter, updateDoc)
        .catch(err => next(err))

    // gets the total number of lockers in the database
    const totalCount = await dbConnect
        .collection('lockers')
        .countDocuments()
        .catch(err =>next(err))



    if(result.matchedCount === totalCount){
        res.json({msg: 'Sucessfully deregistered all lockers'})
    }else{
        res.json({err:'Could not deregister all lockers'})   
    }
    
}

//Registers a specific locker to a given email
export async function admin_register(req, res, next) {
    //connect to database
    const dbConnect = getDb();

    // Filter with locker number and building
    const filter = {
        building: req.body.building,
        number: parseInt(req.body.number)
    };

    //sets the fields that will be updated
    const updateDoc = {
        $set: {
            user: req.body.user,
            userEmail: req.body.userEmail,
            status: 'registered',
            reported: false,
            updatedAt: new Date()
        }
    };
    
    //registers the locker
    const result = await dbConnect
        .collection('lockers')
        .updateOne(filter, updateDoc)
        .catch(err => {next(err)});


    if (result.matchedCount === 1) {
        res.json({msg: "Successfully registered locker"});
    }else{
        res.json({err:'Could not find locker'});
    }

}

//Lookup status/onwership of locker
export async function status (req, res, next){
    //connect to database
    const dbConnect = getDb();

    // Filter using the given number 
    const filter = {
        building: req.params.building,
        number: parseInt(req.params.number)
    };

    // show only user, building, number, status, and reported
    const options = {
        projection: {
            _id: 0,
            user: 1,
            building: 1,
            number: 1,
            status: 1,
            reported: 1
        }
    };

    //searches for locker in database
    const result = await dbConnect
        .collection('lockers')
        .findOne(filter, options)
        .catch(err => next(err));
        

    if (result) {
        res.json(result);
    } else {
        res.json({ err: "not found" });
    }

}

//Get list of reported lockers
export async function report_list (req, res, next){
    //connect to database
    const dbConnect = getDb();

    // Filter using the reported field
    const filter = {
       reported: true
    };

    // show only user, building, number, status, and report status
    const options = {
        projection: {
            _id: 0,
            user: 1,
            building: 1,
            number: 1,
            status: 1,
            reported: 1
        }
    };

    //searches for locker in database and puts them in an array
    const result = await dbConnect
        .collection('lockers')
        .find(filter, options)
        .toArray()
        .catch(err => next(err));


    if (result) {
        res.json(result);
    } else {
        res.json({ err: "not found" });
    }

}