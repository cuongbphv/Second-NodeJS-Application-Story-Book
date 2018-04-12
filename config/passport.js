const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys'); // load keys google 

//Load model into app
const User = mongoose.model('users');


module.exports = function (passport) {
    passport.use(new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: "/auth/google/callback",
            proxy: true // use heroku try connect use https or use on remote server
        },
        (accessToken, refreshToken, profile, done) => {

            const avatarUser = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));

            const newUser = {
                googleID: profile.id,
                email: profile.emails[0].value,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                avatar: avatarUser
            };

            User.findOne({
                googleID: profile.id
            }).then(user => {
                if (user) {
                    done(null,user); // if exists return user to do something
                } else {
                    // create new user by googleID
                    new User(newUser).save().then(user => done(null,user));
                }
            });

        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};