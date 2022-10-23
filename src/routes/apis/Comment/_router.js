const router = require('express').Router();
const auth = require('../../../middleware/auth');

const postComment = require('./postComment');
const getComments = require('./getComments');
const likeDislike = require('./likeComments');



router.use('/comment', auth, postComment)    //posting comment to a post
router.use('/comment', auth, getComments)    //getting comment of a post
router.use('/comment', auth, likeDislike)    //like or dislike comments

module.exports = router;