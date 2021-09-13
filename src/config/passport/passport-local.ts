import passport from 'passport';
import passportLocal from 'passport-local';
import { User, UserInterface } from '../../models/User';

const LocalStrategy = passportLocal.Strategy;

export const configPassportLocal = () => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email: string, password: string, done: any) => {
      User.findOne({ email }, async (err: any, user: any) => {
        if (err) {
          // console.log(err);
          return done(err);
        }

        if (!user) return done(null, false);

        const correctPass = await user.matchPassword(password);

        if (correctPass) {
          return done(null, {
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            activated: user.activated,
          });
        } else return done(null, false);
      });
    })
  );

  passport.serializeUser((user: UserInterface, done: any) => {
    done(null, user._id);
  });

  passport.deserializeUser((id: any, done: any) => {
    User.findById(id, (err: any, user: any) => {
      done(err, user);
    });
  });
};
