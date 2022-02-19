import { getDb } from "../db/conn.js";

export async function search(req, res, next) {
    const dbConnect = getDb();
    const filter = {
        building: req.params.building,
        number: parseInt(req.params.number)
    };

    const options = {
        projection: {
            _id: 0,
            building: 1,
            number: 1,
            status: 1,
            reported: 1
        }
    };

    dbConnect
        .collection('lockers')
        .findOne(filter, options)
        .then(result => {
            if (result) {
                res.json(result);
            } else {
                res.json({ err: "not found" });
            }
        })
        .catch(err => next(err));
}
export async function report(req, res, next) {
    const dbConnect = getDb();
    const filter = {
        building: req.body.building,
        number: parseInt(req.body.number),
        status: 'registered',
        reported: false
    };
    const updateDoc = {
        $set: {
            reported: true,
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
                res.json({ err: "not found" });
            }
        })
        .catch(err => next(err));
}
export async function register(req, res, next) {
    const dbConnect = getDb();
    const filter = {
        building: req.body.building,
        number: parseInt(req.body.number),
        status: 'available'
    };
    const updateDoc = {
        $set: {
            user: req.body.user,
            userEmail: req.body.userEmail,
            status: 'registered',
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
                res.json({ err: "not found" });
            }
        })
        .catch(err => next(err));
}
export async function deregister(req, res, next) {
    const dbConnect = getDb();
    const filter = {
        building: req.body.building,
        number: parseInt(req.body.number),
        user: req.body.user,
        userEmail: req.body.userEmail
    };

    const updateDoc = {
        $set: {
            user: '',
            userEmail: '',
            status: 'available',
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
                res.json({ err: "not found" });
            }
        })
        .catch(err => next(err));
}