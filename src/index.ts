/* eslint-disable */
import * as dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { initDb } from './config/database/index';

import { configPassportGoogle } from './config/passport/passport-google';
import { configPassportLocal } from './config/passport/passport-local';

import authRouter from './routes/authRouter';
import courseRouter from './routes/courseRouter';

initDb();
const app = express();
const PORT = process.env.PORT || 8081;
// const session = require("express-session");
// const cookieSession = require("cookie-session");

/** Defining express middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(
  session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

configPassportGoogle();
configPassportLocal();

/** Defining API routes.*/
app.use('/auth', authRouter);
app.use('/course', courseRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
