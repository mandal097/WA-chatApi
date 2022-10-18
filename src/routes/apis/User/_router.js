const router = require('express').Router();
const auth = require('../../../middleware/auth');

const registration = require('./auth/register');
const login = require('./auth/login');
const loginGoogle = require('./auth/google');
const getProfile = require('./getProfile');
const getAllProfile = require('./getAlluser');
const searchUser = require('./searchUser');
const updateProfile = require('./updateProfile');
const updatePassword = require('./updatePassword');

const connections = require('./connections');


router.use('/user', registration)    //registering user
router.use('/user', login)    //login user
router.use('/user', loginGoogle)    //login user via google
router.use('/user/update-password', updatePassword)    //password reset or forgot password

router.use('/user', auth, getAllProfile)    //get all user profiles
router.use('/user', auth, getProfile)    //get user profile by id
router.use('/user', auth, searchUser)    //search user profiles
router.use('/user/update-profile', auth, updateProfile)    //update user profile

router.use('/user/connections', auth, connections)    //for follow and unfollow users

module.exports = router;