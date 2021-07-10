"use strict";

import { Response, NextFunction } from "express";
const passport = require("passport");

import { Controller } from "./Controller";
const errors = require("../constants/errors");
const statusCodes = require("../constants/statusCodes");
const userService = require("../services/AuthService");
const mailgun = require("../helpers/mailgun");

class AuthController extends Controller {
  constructor(service: any) {
    super(service);
  }

  async isUserLoggedIn(req: any, res: Response, next: NextFunction) {
    res.send(req.isAuthenticated());
  }

  async login(req: any, res: Response, next: NextFunction) {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) return next(err);

      if (!user)
        return res.status(statusCodes.fail).send(errors.wrongCredentials);

      if (!user.activated)
        return res.status(statusCodes.fail).send(errors.accountNotActivated);

      req.logIn(user, (err: any) => {
        if (err) return next(err);
        return res.status(statusCodes.success).send(user);
      });
    })(req, res, next);
  }

  async register(req: any, res: Response) {
    const email = req.body.email;
    const emailAlreadyExists = await this.service.getByEmail(email);

    if (emailAlreadyExists)
      return res.status(statusCodes.fail).send(errors.emailInUseError);

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
