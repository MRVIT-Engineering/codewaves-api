const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../models/User");

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    User.findById(id)
      .then((user) => {
        console.log("User from deserialize is ", user);
        return done(null, user);
      })
      .catch((error) => done(error));
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK,
      },
      async (accessToken, refreshToken, profile, done) => {
        let createdUser = await User.findOne({ googleId: profile.id });
        if (createdUser) {
          console.log("We already created this user. Just log him in.");
          done(null, createdUser);
        } else {
          let user = new User({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
          });

          let newUserDoc = await user.save();
          if (newUserDoc) done(null, newUserDoc);
        }
      }
    )
  );
};
