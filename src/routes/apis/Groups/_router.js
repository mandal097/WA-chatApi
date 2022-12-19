const router = require('express').Router();
const auth = require('../../../middleware/auth');

const adminRoutes = require('./Admin/_router');
const getGroup = require('./getGroup');
const searchedGroups = require('./searchGroup');
const getAllGroups = require('./getAllGroups');
const getJoinedGroups = require('./joinedGroups');
const groupMembers = require('./groupMembers');

const memberRequest = require('./sendMemberRequest');
const getGroupRequests = require('./getGroupRequests');
const handlingAdminInvitations = require('./handleAdminInvitations');
const handlingMembersInvitations = require('./handleMembersInvitations');



router.use('/groups', auth, adminRoutes); //admin routes
router.use('/groups', auth, memberRequest)  //sending request to group admin to become the member of group
router.use('/groups', auth, getGroupRequests)  //getting list  all requests from groups  
router.use('/groups', auth, handlingAdminInvitations)  //handling all requests for admin 
router.use('/groups', auth, handlingMembersInvitations)  //handling all requests for members 

router.use('/groups', auth, searchedGroups)  //searching group by group name
router.use('/groups', auth, getGroup)  //getting group by id
router.use('/groups', auth, getAllGroups)  //getting group by id
router.use('/groups', auth, groupMembers)  //list of group members
router.use('/joined-groups', auth, getJoinedGroups)  //getting group in which a logged in user is a member or joined

module.exports = router;