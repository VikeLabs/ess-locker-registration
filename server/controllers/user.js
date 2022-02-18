const dbo = require("../db/conn.js");

module.exports = {
    search: async (req, res, next) => {
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
            .catch(err => next(err));
    },

    report: async (req, res, next) => {
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
            .catch(err => next(err));
    },

    register: async (req, res, next) => {
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
            .catch(err => next(err));
    },

    deregister: async (req, res, next) => {
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
            .catch(err => next(err));
    }
};