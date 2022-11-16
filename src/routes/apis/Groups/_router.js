const router = require('express').Router();
const auth = require('../../../middleware/auth');

const adminRoutes = require('./Admin/_router');
const getGroup = require('./getGroup');
const getAllGroups = require('./getAllGroups');



router.use('/groups', auth, adminRoutes); //admin routes

router.use('/groups', auth, getGroup)  //getting group by id
router.use('/groups', auth, getAllGroups)  //getting group by id

module.exports = router;