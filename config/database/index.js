const mongoose = require("mongoose");

mongoose.connect(
  process.env.ATLAS_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (error) => {
    if (error) console.log(error);
    else console.log("Connected to Atlas.");
  }
);
