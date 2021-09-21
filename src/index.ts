/* eslint-disable */
import * as dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { configPassportGoogle } from './config/passport/passport-google';
import { configPassportLocal } from './config/passport/passport-local';

import { configSocketIO } from './config/socket.io';
import { initDb } from './config/database/index';
import authRouter from './routes/authRouter';
import courseRouter from './routes/courseRouter';
import sectionRouter from './routes/sectionRouter';
import quizzRouter from './routes/quizzRouter';
import algoRouter from './routes/algoRouter';
import playgroundRouter from './routes/playgroundRouter';
import problemRouter from './routes/problemRouter';
import sphereEngineRouter from './routes/sphereEngiineRouter';

initDb();
const app = express();
export const http = createServer(app);

/** SOCKET.IO configuration */
export const io = new Server(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});
configSocketIO(io);

const PORT = process.env.PORT || 8081;

/** Defining express middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

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
app.use('/section', sectionRouter);
app.use('/quizz', quizzRouter);
app.use('/algo', algoRouter);
app.use('/sphere_engine', sphereEngineRouter);
app.use('/playground', playgroundRouter);
app.use('/problem', problemRouter);

http.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
