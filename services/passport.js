const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id); // user.id is the MongoDB _id, not the Google profile ID
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

//now tell passport to make use of cookies inside the application. 

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    // Strategy implementation
    // console.log('Access Token:', accessToken);
    // console.log('Refresh Token:', refreshToken);
    console.log('Profile:', profile);

    // initiate a query asynchronously to find a user with the given googleId in the database
    User.findOne({ googleId: profile.id })
    .then((existingUser) => {
      if (existingUser) {
        // we already have a record with the given profile ID
        console.log('User already exists:', existingUser);
        done(null, existingUser);
      } else {
        // we don't have a user record with this ID, make a new record
        new User({ googleId: profile.id }).save()
          .then(user => {
            console.log('New user created:', user);
            done(null, user);
          });
      }
    })
  })
);
