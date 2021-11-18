const express = require('express');
const recordRoutes = express.Router();
const dbo = require("../db/conn.js");

recordRoutes.route('/search/building/:building/number/:number').get(async (req, res) => {
    const dbConnect = dbo.getDb();
    const matchDoc = {
        "building": req.params.building,
        "number": req.params.number
    };
    const projectionDoc = {
        "_id": 0,
        "building": 1,
        "number": 1,
        "status": 1,
        "reported": 1
    };

    dbConnect
        .collection('lockers')
        .findOne(matchDoc, projectionDoc)
        .then(result => {
            if (result) {
                res.send(result.status);
            } else {
                res.send("not found");
            }
        })
        .catch(err => {
            res.status(400).send('Error finding locker');
        });
});

recordRoutes.route('/report/building/:building/number/:number').put(async (req, res) => {
    const dbConnect = dbo.getDb();
    const matchDoc = {
        "building": req.params.building,
        "number": req.params.number
    };
    const updateDoc = {
        'reported': true,
        'updatedAt': new Date()
    };

    dbConnect
        .collection('lockers')
        .updateOne(matchDoc, {"reported": true})
        .then(result => {
            if (result.matchedCount === 1) {
                res.send("success");
            } else {
                res.send("not found");
            }
        })
        .catch(err => {
            res.status(400).send('Error reporting locker');
        });
});

recordRoutes.route('/register/').put(async (req, res) => {
    const dbConnect = dbo.getDb();
    const matchDoc = {
        'building': req.body.building,
        'number': req.body.number,
        'status': available
    };
    const updateDoc = {
        'status': 'registered',
        'user': req.body.user,
        'userEmail': req.body.userEmail,
        'updatedAt': new Date()
    };

    dbConnect
        .collection('lockers')
        .updateOne(matchDoc, updateDoc)
        .then(result => {
            if (result.matchedCount === 1) {
                res.send("success");
            } else {
                res.send("not found");
            }
        })
        .catch(err => {
            res.status(400).send('Error registering locker');
        });
});

module.exports = recordRoutes;