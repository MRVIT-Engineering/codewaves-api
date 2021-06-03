const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
    // required: true,
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

userSchema.methods.hashPassword = function () {
  const saltRounds = 10;
  return new Promise((res, rej) => {
    bcrypt.hash(this.password, saltRounds, (err, hash) => {
      if (err) throw err;
      this.password = hash;
      res();
    });
  });
};

userSchema.methods.matchPassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, function (error, result) {
      if (error) throw error;
      resolve(result);
    });
  });
};

const User = mongoose.model("User", userSchema);
module.exports = User;
