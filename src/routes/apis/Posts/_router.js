const router = require('express').Router();
const auth  = require('../../../middleware/auth');
const createPost = require('./createPost');
const getPost = require('./getPost');
const getAllPost = require('./getAllPosts');
const updatePost = require('./updatePost');
const deletePost = require('./deletePost');

router.use('/post', createPost); //creating post
router.use('/post', auth, getPost); //getting a single post by postId
router.use('/post', auth, getAllPost); //getting all  posts by all users
router.use('/post', auth, updatePost); //update post by post id
router.use('/post', auth, deletePost); //delete post by post id



module.exports = router;