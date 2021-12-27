const express = require('express');
const routerRoutes = express.Router();
const dbo = require("../db/conn.js");

routerRoutes.route('/search/building/:building/number/:number').get(async (req, res) => {
    const dbConnect = dbo.getDb();
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
                res.json({err: "not found"});
            }
        })
        .catch(err => {
            res.status(400).send('Error finding locker');
            console.log(err);
        });
});

// request body has building and number
routerRoutes.route('/report').put((req, res) => {
    const dbConnect = dbo.getDb();
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
                res.json({msg: "success"});
            } else {
                res.json({err: "not found"});
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
                res.json({msg: "success"});
            } else {
                res.json({err: "not found"});
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
                res.json({msg: "success"});
            } else {
                res.json({err: "not found"});
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
                res.json({msg: "success"});
            } else {
                res.json({err: "not found"});
            }
        })
        .catch(err => {
            res.status(400).send('Error resolving locker');
            console.log(err);
        });
});

module.exports = routerRoutes;