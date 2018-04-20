const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Story = mongoose.model('stories');

const {
    ensureAuthenticated,
    ensureGuest
} = require('../helpers/ensureAuthenticated');

const router = express.Router();


// show all stories
router.get('/', (req, res) => {
    Story.find({
            status: 'public'
        })
        .populate('user')
        .sort({
            date: 'desc'
        })
        .then(stories => {
            res.render('stories/index', {
                stories: stories
            });
        });
});

//show single sroty
router.get('/show/:id', (req, res) => {
    Story.findOne({
            _id: req.params.id
        })
        .populate('user')
        .populate('comments.commentUser')
        .then(story => {
            if (story.status == 'public') {
                res.render('stories/show', {
                    story: story
                });
            } else {
                if(req.user){
                    if(req.user.id == story.user._id){
                        res.render('stories/show', {
                            story: story
                        });
                    }
                    else{
                        res.redirect('/stories');
                    }
                }
                else{
                    res.redirect('/stories');
                }               
            }
        });
});

//show stories of user
router.get('/user/:userId', (req, res) => {
    Story.find({
            user: req.params.userId,
            status: 'public'
        }).populate('user')
        .then(stories => {
            res.render('stories/index', {
                stories: stories
            });
        });
});

// show my story
router.get('/my', ensureAuthenticated, (req, res) => {
    Story.find({
            user: req.user.id,
        }).populate('user')
        .then(stories => {
            res.render('stories/index', {
                stories: stories
            });
        });
});

// add new story
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('stories/add');
});

// edit new story
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Story.findOne({
            _id: req.params.id
        })
        .then(story => {
            if (story.user != req.user.id) {
                res.redirect('/stories');
            } else {
                res.render('stories/edit', {
                    story: story
                });
            }
        });
});

// edit story by id
router.put('/:id', ensureAuthenticated, (req, res) => {
    Story.findOne({
            _id: req.params.id
        })
        .then(story => {
            let allowComments;

            if (req.body.allowComments) {
                allowComments = true;
            } else {
                allowComments = false;
            }

            // New values
            story.title = req.body.title;
            story.body = req.body.body;
            story.status = req.body.status;
            story.allowComments = allowComments;

            story.save()
                .then(story => {
                    res.redirect('/dashboard');
                });
        });
});

// submit new story
router.post('/', ensureAuthenticated, (req, res) => {
    let allowComments;

    if (req.body.allowComments) {
        allowComments = true;
    } else {
        allowComments = false;
    }

    const newStory = {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments: allowComments,
        user: req.user.id
    };

    new Story(newStory)
        .save()
        .then(story => {
            res.redirect('stories/show/' + story.id);
        });
});

// delete story by id
router.delete('/:id', ensureAuthenticated, (req, res) => {
    Story.remove({
        _id: req.params.id
    }).then(() => {
        res.redirect('/dashboard');
    });
});

// add comment into story
router.post('/comment/:id', ensureAuthenticated, (req, res) => {
    Story.findOne({
        _id: req.params.id
    }).then(story => {
        const newComment = {
            commentBody: req.body.commentBody,
            commentUser: req.user.id
        };

        // push comment into story comments arrays
        story.comments.unshift(newComment);

        story.save()
            .then(story => {
                res.redirect(`/stories/show/${story.id}`);
            });

    });
});


module.exports = router;