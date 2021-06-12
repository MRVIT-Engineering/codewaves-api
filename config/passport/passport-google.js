const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../../models/User");
const mailgun = require("../../helpers/mailgun");

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    User.findById(id)
      .then((user) => {
        return done(null, user);
      })
      .catch((error) => done(error));
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8081/auth/google/callback",
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        let createdUser = await User.findOne({
          email: profile.emails[0].value,
        });

        if (createdUser) {
          done(null, createdUser);
        } else {
          let user = new User({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            googleId: profile.id,
          });

          let newUserDoc = await user.save();
          mailgun.sendConfirmationLink(newUserDoc._id, newUserDoc.email);
          if (newUserDoc) done(null, newUserDoc);
        }
      }
    )
  );
};
