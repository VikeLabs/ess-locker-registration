// get environment variables into process.env
import './loadEnv.js';

import express, { json } from 'express';
import cors from 'cors';
import router from './routes/router.js';

// get MongoDB driver connection
import { connectToServer } from './db/conn.js';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(json());
app.use(router);

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