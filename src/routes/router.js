const router = require('express').Router();
const userRoutes = require('./apis/User/_router');
const chatRoutes = require('./apis/Chats/_router');
const messageRoutes = require('./apis/Messages/_router');
const postsRoutes = require('./apis/Posts/_router');
const commentRoutes = require('./apis/Comment/_router')
const groupRoutes = require('./apis/Groups/_router');
const marketPlaceRoutes = require('./apis/MarketPlace/_router');

const sendOtp = require('./apis/sendOtp');
const deleteOtp = require('./apis/deleteOtp');

router.use('/', userRoutes); //test
router.use('/api', userRoutes); //user
router.use('/api', chatRoutes); //chats routes
router.use('/api', postsRoutes); // post routes 
router.use('/api', messageRoutes); //message routes
router.use('/api', commentRoutes); //commenting on posts
router.use('/api', groupRoutes); //groups routes
router.use('/api', marketPlaceRoutes); //marketplace routes

router.use('/api', sendOtp); //send otp to user to update password
router.use('/api', deleteOtp); //delete particular users otp document from the DataBase

module.exports = router;