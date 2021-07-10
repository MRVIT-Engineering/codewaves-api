"use strict";

require("dotenv").config();
require("./config/database");

import express from "express";
import { resourceLimits } from "worker_threads";
import { configPassportGoogle } from "./config/passport/passport-google";
import { configPassportLocal } from "./config/passport/passport-local";

const app = express();
const PORT = process.env.PORT || 8081;
const session = require("express-session");
const passport: any = require("passport");
const cors = require("cors");
const cookieSession = require("cookie-session");

import authRouter from "./routes/authRouter";

/** Defining express middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SECRET],
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "ad9f8adsf98pdFDJ)3ffdsa",
    resave: true,
    saveUninitialized: true,
  })
);

/** Passport setup & config. */
configPassportGoogle(passport);
configPassportLocal(passport);
app.use(passport.initialize());
app.use(passport.session());

/** Defining API routes.*/
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
