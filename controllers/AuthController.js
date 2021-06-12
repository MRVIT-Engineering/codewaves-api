"use strict";

const passport = require("passport");

const errors = require("../constants/errors");
const statusCodes = require("../constants/statusCodes");

const Controller = require("./Controller");
const userService = require("../services/AuthService");
const mailgun = require("../helpers/mailgun");

class AuthController extends Controller {
  constructor(service) {
    super(service);
  }

  async isUserLoggedIn(req, res, next) {
    res.send(req.isAuthenticated());
  }

  async logInWithGoogle(req, res, next) {}

  async login(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);

      if (!user)
        return res.status(statusCodes.fail).send(errors.wrongCredentials);

      if (!user.activated)
        return res.status(statusCodes.fail).send(errors.accountNotActivated);

      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.status(statusCodes.success).send(user);
      });
    })(req, res, next);
  }

  async register(req, res) {
    const email = req.body.email;
    const emailAlreadyExists = await this.service.getByEmail(email);

    if (emailAlreadyExists)
      return res.stauts(statusCodes.fail).send(errors.emailInUseError);

    try {
      let newUser = await this.service.insert(req.body);
      mailgun.sendConfirmationLink(newUser._id, newUser.email);
      res.status(statusCodes.success).send(newUser);
    } catch (error) {
      console.log("Error in register controller ", error);
      this._sendInternalErrorResponse(res, errors.internalServerError);
    }
  }
}

const authController = new AuthController(userService);
module.exports = authController;
