const dbo = require("../db/conn.js");

module.exports = {
    resolve: async (req, res) => {
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
    }
};