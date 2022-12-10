const router = require('express').Router();

const createGroup = require('./createGroup');
const getMyGroups = require('./myGroups');
const updateGroup = require('./updateGroupDetails');

const createGroupRules = require('./createGroupRules');
const getGroupRules = require('./getGroupRules');
const deleteRules = require('./deleteGroupRules');
const updateRules = require('./updateGroupRules');

const activitiesRoutes = require('./groupActivities');


router.use('/my', getMyGroups);  //getting groups created  by logged in user or is he a admin of that group
router.use('/create', createGroup);  //creating groups
router.use('/update', updateGroup);  //updating groups

router.use('/rules', createGroupRules);  //posting  group rules
router.use('/rules', getGroupRules);  //getting group rules
router.use('/rules', deleteRules);  //deteting group rules
router.use('/rules/update', updateRules);  //updating group rules

router.use('/activities',activitiesRoutes) // tracking actions in the group



module.exports = router;