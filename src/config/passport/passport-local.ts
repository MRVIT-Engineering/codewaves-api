import passport from "passport";
import passportLocal from "passport-local";
const LocalStrategy = passportLocal.Strategy;
import { User } from "../../models/User";

export const configPassportLocal = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      (email: string, password: string, done: any) => {
        User.findOne({ email }, async (err: any, user: any) => {
          if (err) {
            console.log(err);
            return done(err);
          }

          if (!user) return done(null, false);

          let correctPass = await user.matchPassword(password);

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
      }
    )
  );

  passport.serializeUser((user: any, done: any) => {
    done(null, user._id);
  });

  passport.deserializeUser((id: any, done: any) => {
    User.findById(id, (err: any, user: any) => {
      done(err, user);
    });
  });
};
