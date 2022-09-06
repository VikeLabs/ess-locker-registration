// Loads the configuration from config.env to process.env
require('dotenv').config({ path: './config.env' });

const express = require('express');
const cors = require('cors');

const dbo = require("../db/conn.js");

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
dbo.connectToServer((err) => {
  if (err) {
    console.error(err);
    process.exit();
  }

  let lockers = [];
  
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
  
  const dbConnect = dbo.getDb();
  
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
});