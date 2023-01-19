// get environment variables into process.env
import './util/loadEnv.js';

// load middlewares
import express, { json } from 'express';
import cors from 'cors';
import router from './routes/router.js';

// get MongoDB driver connection
import { connectToServer } from './db/conn.js';

const PORT = process.env.PORT || 8000;
const app = express();

// middlewares
app.use(cors());
app.use(json());
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
try {
  await connectToServer();
} catch {
  console.error(err);
  process.exit();
}

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});