require('dotenv').config()
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID ,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/auth/google/redirect',
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
));