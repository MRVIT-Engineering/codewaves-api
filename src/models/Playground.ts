const mongoose = require("mongoose");

const playgroundSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  tabs: {
    type: Array,
    required: true,
  },
});

const Playground = mongoose.model("Playground".playgroundSchema);
