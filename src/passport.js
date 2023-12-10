// passport.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require('dotenv').config()
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID_GOOGLE,
        clientSecret: process.env.CLIENT_SECRET_GOOGLE,
        callbackURL: "/api/auth/google/callback",
        scope: ["profile", "email"],
      },
      function (accessToken, refreshToken, profile, callback, done) {
        done(null,profile)
        // callback(null, profile);
        // const user = {
        //   username: profile.displayName,
        //   avatar: profile.photos && profile.photos.length > 0 ? profile.photos[0] : null,
        // };
        
        // done(null, user)
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

