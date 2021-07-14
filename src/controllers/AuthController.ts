import { Response, NextFunction } from 'express';
import passport from 'passport';
import { sendConfirmationLink } from '../helpers/mailgun';

import { Controller } from './Controller';
import { errors } from '../constants/errors';

const statusCodes = require('../constants/statusCodes');
const userService = require('../services/AuthService');

class AuthController extends Controller {
  constructor(service: any) {
    super(service);
  }

  async isUserLoggedIn(req: any, res: Response) {
    res.send(req.isAuthenticated());
  }

  async login(req: any, res: Response, next: NextFunction) {
    passport.authenticate('local', (err: any, user: any) => {
      if (err) return next(err);

      if (!user) return res.status(statusCodes.fail).send(errors.wrongCredentials);

      if (!user.activated) return res.status(statusCodes.fail).send(errors.accountNotActivated);

      req.logIn(user, (loginError: any) => {
        if (err) return next(loginError);
        return res.status(statusCodes.success).send(user);
      });
    })(req, res, next);
  }

  async register(req: any, res: Response) {
    const email = req.body.email;
    const emailAlreadyExists = await this.service.getByEmail(email);

    if (emailAlreadyExists) return res.status(statusCodes.fail).send(errors.emailInUseError);

    try {
      const newUser = await this.service.insert(req.body);
      sendConfirmationLink(newUser._id, newUser.email);
      return res.status(statusCodes.success).send(newUser);
    } catch (error) {
      return this.sendInternalErrorResponse(res, errors.internalServerError);
    }
  }
}

export const authController = new AuthController(userService);
