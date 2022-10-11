const router = require('express').Router();
const auth = require('../../../middleware/auth');
const getChat = require('./getChats');
const createChat = require('./createChat');
const createGroupChat = require('./createGroup');
const getGroups = require('./getGroups');
const deleteChat = require('./deleteChat');
const renameGroup = require('./renameGroup');
const addNewUserGroup = require('./addNewUser');
const removeFromGroup = require('./removeFromGroup');


router.use('/chats', auth, createChat)  //creating new chat
router.use('/chats', auth, getChat);   //accessing chats

router.use('/chats/group', auth, createGroupChat)  //creating new createGroupChat
router.use('/chats/group', auth, getGroups)  //getting all groups of the user 
router.use('/chats/group', auth, renameGroup)  //renaming group
router.use('/chats/group', auth, addNewUserGroup)  //adding  new user to group
router.use('/chats/group', auth, removeFromGroup)  //removing someone from group
router.use('/chats/group', auth, deleteChat);   //deleting group





module.exports = router;