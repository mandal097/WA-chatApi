const router = require('express').Router();

const createGroup = require('./createGroup');
const getMyGroups = require('./myGroups');
const updateGroup = require('./updateGroupDetails');

const createGroupRules = require('./createGroupRules');
const getGroupRules = require('./getGroupRules');
const deleteRules = require('./deleteGroupRules');
const updateRules = require('./updateGroupRules');

const activitiesRoutes = require('./groupActivities');

const handleAdminInvites = require('./handleAdminInvites');

const handleMembers = require('./handleMembers');

const handleMembersRequested = require('./handleMembersRequests');
const handleMembersInvites = require('./handleMemberInvites');

const deleteGroup = require('./deleteGroup');
const removeAdmin = require('./removeAdmin');

const handlePendingPost = require('./handlePendingPost')


router.use('/my', getMyGroups);  //getting groups created  by logged in user or is he a admin of that group
router.use('/create', createGroup);  //creating groups
router.use('/update', updateGroup);  //updating groups

router.use('/rules', createGroupRules);  //posting  group rules
router.use('/rules', getGroupRules);  //getting group rules
router.use('/rules', deleteRules);  //deteting group rules
router.use('/rules/update', updateRules);  //updating group rules

router.use('/handle-admins', handleAdminInvites) // for inviting group-member as admin in group and same for cancelling invites

router.use('/remove-admin', removeAdmin) // removing group admin by another admin

router.use('/handle-members', handleMembersInvites) // for inviting users as member in group and same for removal

router.use('/activities', activitiesRoutes) // tracking actions in the group

router.use('/members', handleMembers) // handling members requests to the group

router.use('/handle-members-request', handleMembersRequested) // handling members requests to the group

router.use('/handle-pending-post', handlePendingPost) // handling pending post

router.use('/delete', deleteGroup) // deleting group



module.exports = router;