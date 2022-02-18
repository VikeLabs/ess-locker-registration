const dbo = require("../db/conn.js");
const converter = require("json2csv");
const fs = require("fs");

module.exports = {
    resolve: async (req, res, next) => {
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
                    res.json({err: "reported locker not found"});
                }
            })
            .catch(err => next(err));
    },
    getRegisteredLockers: async (req, res, next)=> {
        const dbConnect = dbo.getDb();
        const filter = {
            status: "registered"
        };
        
        const registeredLockers = await dbConnect.collection('lockers')
            .find(filter)
            .toArray()
            .catch(err => next(err));

        converter.json2csvAsync(registeredLockers).then(csv => {
            fs.writeFileSync('../files/registeredLockers.csv', csv);

            res.download('../files/regiesteredLockers.csv');
        }).catch(err => next(err));
    },
    getAvailableCount: async (req, res, next) => {
        const dbConnect = dbo.getDb();
        const filter = {
            status: "available"
        };

        const count = await dbConnect.collection('lockers')
            .find(filter)
            .count()
            .catch(err => next(err));

        res.json({availableCount: count});
    }
};