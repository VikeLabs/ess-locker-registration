// get environment variables into process.env
import './util/loadEnv.js';

// load middlewares
import express, { json } from 'express';
import cors from 'cors';
import router from './routes/router.js';
import {auth} from 'express-openid-connect';

// get MongoDB driver connection
import { connectToServer } from './db/conn.js';

const PORT = process.env.PORT || 8000;
const app = express();

// auth config

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:8000',
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  secret: process.env.AUTH0_CLIENT_SECRET
};

// middlewares
app.use(cors());
app.use(json());
app.use(auth(config));
app.use(router);

// Error handling
app.use(err => {
  console.error(err.stack);
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status === 403) {
    res.status(403).end();
  }
  res.status(500).send('Something broke!');
});

// perform a database connection when the server starts
await connectToServer()
  .catch(err => {
    console.error(err);
    process.exit();
  });

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});