const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// pull model out of mongoose (single argument)
const User = mongoose.model('users');

// initialize passport strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
        },
        (accessToken, refreshToken, profile, done) => {
            // create a new instance of the Model Class
            // and save it to the db
            new User({ googleId: profile.id }).save();
        }
    )
);
