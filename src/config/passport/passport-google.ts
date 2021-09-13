import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';

import { User } from '../../models/User';
import { sendConfirmationLink } from '../../helpers/mailgun';

const GoogleStrategy = passportGoogle.Strategy;

export const configPassportGoogle = () => {
  passport.serializeUser((user: any, done: any) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id: string, done: any) => {
    User.findById(id)
      .then((user: any) => done(null, user))
      .catch((error: any) => done(error));
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || 'googleclientid',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'googleClinetSecret',
        callbackURL: 'http://localhost:8081/auth/google/callback',
        passReqToCallback: true,
      },
      async (req: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
        const createdUser = await User.findOne({
          email: profile.emails[0].value,
        });

        if (createdUser) {
          done(null, createdUser);
        } else {
          const user = new User({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            googleId: profile.id,
          });

          const newUserDoc = await user.save();
          sendConfirmationLink(newUserDoc._id, newUserDoc.email);
          if (newUserDoc) done(null, newUserDoc);
        }
      }
    )
  );
};
