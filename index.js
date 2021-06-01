require("dotenv").config();
require("./config/database");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8081;

const authRouter = require("./routes/authRouter");

app.use(express.json());

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
