const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/User");

module.exports = () => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email }, async (err, user) => {
        if (err) {
          console.log(err);
          return done(err);
        }

        if (!user) return done(null, false);

        let correctPass = await user.matchPassword(password);

        if (correctPass) {
          console.log("Correct password");
          return done(null, {
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          });
        } else return done(null, false);
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
