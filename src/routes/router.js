const router = require('express').Router();
const userRoutes = require('./apis/User/_router');
const chatRoutes = require('./apis/Chats/_router');
const sendOtp = require('./apis/sendOtp');
const deleteOtp = require('./apis/deleteOtp');

router.use('/', userRoutes); //test
router.use('/api', userRoutes); //user
router.use('/api', chatRoutes); //chats routes
router.use('/api', sendOtp); //send otp to user to update password
router.use('/api', deleteOtp); //delete particular users otp document from the DataBase

module.exports = router;