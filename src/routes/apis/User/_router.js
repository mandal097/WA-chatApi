const router = require('express').Router();
const registration  = require('./auth/register') 
const login  = require('./auth/login') 

router.use('/user', registration) //registering user
router.use('/user', login) //login user

module.exports = router;