const express = require('express');
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const User = mongoose.model('users');

const {
    ensureAuthenticated,
    ensureGuest
} = require('../helpers/ensureAuthenticated');

const router = express.Router();

router.get('/', ensureGuest, (req, res) => {
    res.render('index/welcome');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    Story.find({
            user: req.user.id
        })
        .then(stories => {
            res.render('index/dashboard', {
                stories: stories
            });
        });
});

router.get('/about', (req, res) => {
    res.render('index/about');
});

module.exports = router;