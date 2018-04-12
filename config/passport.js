const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys'); // load keys google 

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: "/auth/google/callback",
            proxy: true // use heroku try connect use https or use on remote server
        },
        (accessToken, refreshToken, profile, done) => {
            console.log(accessToken);
            console.log(profile);

            // User.findOrCreate({
            //     googleId: profile.id
            // }, (err, user) => {
            //     return cb(err, user);
            // });
        }
    ));
}