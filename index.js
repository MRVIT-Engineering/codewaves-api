require("dotenv").config();
require("./config/database");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8081;
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

const authRouter = require("./routes/authRouter");

/** Defining express middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "ad9f8adsf98pdFDJ)3ffdsa",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

/** Passport setup & config. */
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport/passport-local")(passport);

/** Defining API routes.*/
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
