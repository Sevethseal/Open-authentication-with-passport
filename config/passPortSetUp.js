const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/userModel");

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then((currentUser) => {
    done(null, currentUser);
  });
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(async (currentUser) => {
        if (currentUser) {
          console.log(currentUser.username + " already exist");
          done(null, currentUser);
        } else {
          const newUser = new User({
            username: profile.displayName,
            googleId: profile.id,
          });
          await newUser.save().then((newUser) => {
            console.log("note saved!");
            done(null, newUser);
          });
        }
      });
    }
  )
);
