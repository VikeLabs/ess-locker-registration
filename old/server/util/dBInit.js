// Loads the configuration from config.env to process.env
import './loadEnv.js'

import express from 'express'
import cors from 'cors'

import { connectToServer, getDb } from '../db/conn.js'


const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// Global error handling
app.use((err, _req, res) => {
console.error(err.stack);
res.status(500).send('Something broke!');
});

// perform a database connection when the server starts

connectToServer().then(()=>{
    let lockers = [];
    let lockerDoc ={}
    let TermsDoc ={}

    var lockerNumbers = [];

    for (let i=1; i<310; i++){
        lockerNumbers.push({building: 'elw', number: i})
    }

    for (let j=1; j<530; j++){
        lockerNumbers.push({building: 'ecs', number: j})
    }
  
  function addLocker(building, number) {
      lockerDoc = {
          "building": building,
          "number": number,
          user: '',
          userEmail: '',
          status: 'available',
          reported: false,
          updatedAt: new Date(),
          createdAt: new Date()
      };
  
      lockers.push(lockerDoc);
  }
  
  lockerNumbers.forEach((locker) => addLocker(locker.building, locker.number));
  
  
  const dbConnect = getDb();

  //dbConnect.collection('lockers').updateMany({number: 136}, { $set:{reported: true}})
  
dbConnect.collection('lockers').insertMany(lockers)
    .then(result => {
        if (result.acknowledged) {
            console.log(`successfully inserted ${result.insertedCount} items`);
        } else {
            console.log(`write not acknowledged`);
        }
    }).catch(err => {
        console.log(err);
    });


}).catch((err) => {
    if (err) {
        console.error(err);
        process.exit();
}})