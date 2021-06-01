const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minLength: 8,
  },
  progress: {
    type: Object,
    default: {},
  },
  playgrounds: {
    type: Array,
    default: [],
  },
  questions: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
