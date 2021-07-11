import { Router } from 'express';
import passport from 'passport';

import { authController } from '../controllers/AuthController';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get(
  '/login_google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: process.env.GOOGLE_FAILURE_REDIRECT,
    successRedirect: process.env.GOOGLE_SUCCESS_REDIRECT,
  }),
  (req: any, res: any) => {
    res.send('Thank you for signing in!');
  }
);

router.post('/check', authController.isUserLoggedIn);

export default router;
