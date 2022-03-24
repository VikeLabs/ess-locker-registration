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

console.log('Stop A')
connectToServer().then(()=>{
    let lockers = [];
    let lockerDoc ={}
    let TermsDoc ={}

    const lockerNumbers = [
        {building: 'elw', number: 100},
        {building: 'elw', number: 101},
        {building: 'elw', number: 102},
        {building: 'elw', number: 110},
        {building: 'elw', number: 120},
        {building: 'elw', number: 130},
        {building: 'ecs', number: 100},
        {building: 'ecs', number: 101},
        {building: 'ecs', number: 102},
        {building: 'ecs', number: 110},
        {building: 'ecs', number: 120},
        {building: 'ecs', number: 130},
    ];
  
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

    let Terms =[]
    const details = [
    {message:'You under rule of ESS'},
    {message: 'You must obey us'}

    ]

    function add_to_TandC (message){
        TermsDoc = {
            "message":message,
            updatedAt: new Date(),
            createdAt: new Date()
        }

        Terms.push(TermsDoc)
    }

    details.forEach((TandC)=>add_to_TandC(TandC.message))
    console.log('Stop D')

    console.log(Terms)

    dbConnect.collection('T & C').insertMany(Terms)
    .then((result)=>{
        if(result){
            console.log('successfully inserted ' + result.insertedCount + ' items')
        }else{
            console.log('Unable to insert items')
        }
    }).catch((err)=>{
        console.log(err)
    })


    }).catch((err) => {
    if (err) {
        console.error(err);
        process.exit();
    }
    console.log('Stop B')
    })