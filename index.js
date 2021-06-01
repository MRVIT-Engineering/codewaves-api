const express = require("express");
const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
