import { getDb } from "../db/conn.js";

// search db for locker with given building and number
export async function search(req, res, next) {
    // set up query
    const dbConnect = getDb();

    // filter
    const filter = {
        building: req.params.building,
        number: parseInt(req.params.number)
    };

    // show only building, number, status, and report status
    const options = {
        projection: {
            _id: 0,
            building: 1,
            number: 1,
            status: 1,
            reported: 1
        }
    };

    try {
        // find locker
        const result = await dbConnect
            .collection('lockers')
            .findOne(filter, options);

        // send locker to client
        if (result) {
            res.json(result);
        } else {
            res.json({ err: "not found" });
        }
    } catch (err) {
        next(err);
    }
}

// report a locker with the given building and number
export async function report(req, res, next) {
    // set up db update
    const dbConnect = getDb();

    // filter out available lockers and reported lockers
    const filter = {
        building: req.body.building,
        number: parseInt(req.body.number),
        status: 'registered',
        reported: false
    };

    // set fields to be updated
    const updateDoc = {
        $set: {
            reported: true,
            updatedAt: new Date()
        }
    };

    try {
        // report the locker
        const result = await dbConnect
            .collection('lockers')
            .updateOne(filter, updateDoc);
        
        // send result to client
        if (result.matchedCount === 1) {
            res.json({ msg: "success" });
        } else {
            res.json({ err: "not found" });
        }
    } catch (err) {
        next(err);
    }
}

// register the locker with the given building and number
export async function register(req, res, next) {
    // set up update
    const dbConnect = getDb();

    // filter registered lockers
    const filter = {
        building: req.body.building,
        number: parseInt(req.body.number),
        status: 'available'
    };

    // set update fields
    const updateDoc = {
        $set: {
            user: req.body.user,
            userEmail: req.body.userEmail,
            status: 'registered',
            updatedAt: new Date()
        }
    };

    try {
        // register the locker
        const result = await dbConnect
            .collection('lockers')
            .updateOne(filter, updateDoc);

        // send result to client
        if (result.matchedCount === 1) {
            res.json({ msg: "success" });
        } else {
            res.json({ err: "not found" });
        }
    } catch (err) {
        next(err);
    }
}

// deregister a locker given its building, number, and user/email
export async function deregister(req, res, next) {
    // get database connection
    const dbConnect = getDb();

    // ensure that the credentials match
    const filter = {
        building: req.body.building,
        number: parseInt(req.body.number),
        user: req.body.user,
        userEmail: req.body.userEmail
    };

    // clear the information
    const updateDoc = {
        $set: {
            user: '',
            userEmail: '',
            status: 'available',
            reported: false,
            updatedAt: new Date()
        }
    };

    try {
        // deregister the locker
        const result = await dbConnect
            .collection('lockers')
            .updateOne(filter, updateDoc);

        // send the result to the client
        if (result.matchedCount === 1) {
            res.json({ msg: "success" });
        } else {
            res.json({ err: "not found" });
        }
    } catch (err) {
        next(err);
    }
}