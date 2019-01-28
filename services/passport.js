const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// turn user into cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// get user from cookie
passport.deserializeUser((id, done)=> {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id })
    .then((existingUser) => {
      if (existingUser) {
        // already have a record
        done(null, existingUser);
      } else {
        // create a new user
        new User({ googleId: profile.id })
          .save()
          .then(user => done(null, user));
      }
    });
}));

