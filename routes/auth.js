const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth/google'
    }),
    (req, res) => {
        res.redirect('/');
    });

router.get('/verify',(req,res) => {
    if(req.user){
        console.log(req.user);
    }
    else{
        console.log('Not Authentication');
    }
});


router.get('/logout',(req,res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;