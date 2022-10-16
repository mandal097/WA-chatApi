const router = require('express').Router();
const userRoutes = require('./apis/User/_router');
const chatRoutes = require('./apis/Chats/_router');
const messageRoutes = require('./apis/messages/_router');
const sendOtp = require('./apis/sendOtp');
const deleteOtp = require('./apis/deleteOtp');
const postsRoutes = require('./apis/Posts/_router')

router.use('/', userRoutes); //test
router.use('/api', userRoutes); //user
router.use('/api', chatRoutes); //chats routes
router.use('/api', postsRoutes); // post routes 
router.use('/api', messageRoutes); //message routes
router.use('/api', sendOtp); //send otp to user to update password
router.use('/api', deleteOtp); //delete particular users otp document from the DataBase

module.exports = router;