"use strict";

const Controller = require("./Controller");
const userService = require("../services/AuthService");
const statusCodes = require("../constants/statusCodes");
const errors = require("../constants/errors");
const passport = require("passport");

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
        // sending a fail status code instead of 401 because we dont want to reload the login page.
        return res.status(statusCodes.fail).send(errors.wrongCredentials);

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
      res.status(statusCodes.success).send({ success: true, ...newUser });
    } catch (error) {
      console.log("Error in register controller ", error);
      this._sendInternalErrorResponse(res, errors.internalServerError);
    }
  }
}

const authController = new AuthController(userService);
module.exports = authController;
