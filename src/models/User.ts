const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

export interface UserInterface {
  googleId?: string;
  acitvated?: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  progress?: any;
  playgrounds?: any[];
  questions?: any[];
  _id?: string;
}

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: false,
    default: '',
  },
  activated: {
    type: Boolean,
    default: false,
  },
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
  return new Promise((res: any, rej: any) => {
    bcrypt.hash(this.password, saltRounds, (err: any, hash: any) => {
      if (err) rej(err);
      this.password = hash;
      res();
    });
  });
};

userSchema.methods.matchPassword = function (password: string) {
  return new Promise((res: any, rej: any) => {
    bcrypt.compare(password, this.password, function (error: any, result: any) {
      if (error) rej(error);
      res(result);
    });
  });
};

export const User = mongoose.model('User', userSchema);
