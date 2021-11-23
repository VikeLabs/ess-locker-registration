const express = require('express');
const routerRoutes = express.Router();
const dbo = require("../db/conn.js");

routerRoutes.route('/search/building/:building/number/:number').get(async (req, res) => {
    const dbConnect = dbo.getDb();
    const matchDoc = req.params;
    const projectionDoc = {
        _id: 0,
        building: 1,
        number: 1,
        status: 1,
        reported: 1
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
            console.log(err);
        });
});

// request body has building and number
routerRoutes.route('/report').put(async (req, res) => {
    const dbConnect = dbo.getDb();
    const matchDoc = {
        ...req.body,
        status: 'registered'
    };
    const updateDoc = {
        reported: true,
        updatedAt: new Date()
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
            res.status(400).send('Error reporting locker');
            console.log(err);
        });
});

// request body has building, number, user, userEmail
routerRoutes.route('/register').put(async (req, res) => {
    const dbConnect = dbo.getDb();
    const matchDoc = {
        building = req.body.building,
        number = req.body.number,
        status: 'available'
    };
    const updateDoc = {
        user = req.body.user,
        userEmail = req.body.userEmail,
        status: 'registered',
        updatedAt: new Date()
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
            console.log(err);
        });
});

// request body has building, number, user, userEmail
routerRoutes.route('/deregister').put(async (req, res) => {
    const dbConnect = dbo.getDb();
    const matchDoc = req.body;
    const updateDoc = {
        user: '',
        userEmail: '',
        status: 'available',
        reported: false,
        updatedAt: new Date()
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
            console.log(err);
        });
});

// request body has building and number
routerRoutes.route('/resolve').put(async (req, res) => {
    const dbConnect = dbo.getDb();
    const matchDoc = req.body;
    const updateDoc = {
        reported: false,
        updatedAt: new Date()
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
            res.status(400).send('Error resolving locker');
            console.log(err);
        });
});

module.exports = routerRoutes;