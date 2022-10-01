const router = require('express').Router();
const userRoutes = require('./apis/User/_router');
const sendOtp = require('./apis/sendOtp');

router.use('/', userRoutes); //test
router.use('/api', userRoutes); //user
router.use('/api', sendOtp); //user

module.exports = router;