const router = require('express').Router();
const auth = require('../../../middleware/auth');

const postComment = require('./postComment');
const replyToComment = require('./replyToComment');
const getComments = require('./getComments');
const getReplyComments = require('./getRepliedComments');
const likeDislike = require('./likeComments');
const deleteComment = require('./deleteComment');



router.use('/comment', auth, postComment)    //posting comment to a post
router.use('/comment', auth, replyToComment)    //replying to comment of posts
router.use('/comment', auth, getComments)    //getting comment of a post
router.use('/comment', auth, getReplyComments)    //getting replies of comment of a post
router.use('/comment', auth, likeDislike)    //like or dislike comments
router.use('/comment', auth, deleteComment)    //delete comment

module.exports = router;