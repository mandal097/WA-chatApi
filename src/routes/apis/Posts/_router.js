const router = require('express').Router();
const auth  = require('../../../middleware/auth');
const createPost = require('./createPost');
const getPost = require('./getPost');
const getPosts = require('./getPosts');
const updatePost = require('./updatePost');
const likeDislikePost = require('./likeDislikePost');
const deletePost = require('./deletePost');
const savePost = require('./savePost');



router.use('/post', createPost); //creating post
router.use('/post', auth, getPost); //getting a single post by postId
router.use('/post', auth, getPosts); //getting all  posts users / random posts 
router.use('/post', auth, updatePost); //update post by post id
router.use('/post', auth, likeDislikePost); //like or dislike post 
router.use('/post', auth, deletePost); //delete post by post id
router.use('/post', auth, savePost); //save post 



module.exports = router;