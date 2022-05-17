// get environment variables into process.env
import './util/loadEnv.js';

// load middlewares
import express, { json } from 'express';
import cors from 'cors';
import router from './routes/router.js';

import passport from 'passport';
import expressSession from 'express-session';
import Auth0Strategy from 'passport-auth0';

import authRouter from './auth.js'

// get MongoDB driver connection
import { connectToServer } from './db/conn.js';

const PORT = process.env.PORT || 8000;
const app = express();

// session config

const session = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: false
};

if (app.get('env') === 'production') {
  session.cookie.secure = true;
};

// passport config

const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL
  },
  (accessToken, refreshToken, extraParams, profile, done) => done(null, profile)
);

// app config

app.use(expressSession(session));

passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

// middlewares
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if ('OPTIONS' == req.method) {
       res.sendStatus(200);
   } else {
       next();
   }
});
app.use("/", authRouter);
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
await connectToServer()
  .catch(err => {
    console.error(err);
    process.exit();
  });

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});