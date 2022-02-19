// Loads the configuration from config.env to process.env
require('dotenv').config({ path: './config.env' });

import express, { json } from 'express';
import cors from 'cors';
// get MongoDB driver connection
import { connectToServer } from './db/conn';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(json());
app.use(require('./routes/router').default);

// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// perform a database connection when the server starts
connectToServer((err) => {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});