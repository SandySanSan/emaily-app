const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// pull model out of mongoose (single argument)
const User = mongoose.model('users');

// user >  Model instance of mongoose
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

// initialize passport strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true,
        },
        (accessToken, refreshToken, profile, done) => {
            // return promise
            User.findOne({ googleId: profile.id }).then(existingUser => {
                if (existingUser) {
                    // record found with the given profile id
                    done(null, existingUser);
                    // done(), callback, tells passport the auth flow is complete
                    // null -> no error
                } else {
                    // existingUser is null,
                    // create as new instance of the Model Class
                    // and save it to the db (create a new Model instance)
                    new User({ googleId: profile.id })
                        .save()
                        .then(user => done(null, user));
                }
            });
        }
    )
);
