const router = require('express').Router();
const auth = require('../../../middleware/auth');
const getChat = require('./getChats');
const createChat = require('./createChat');
const createGroupChat = require('./createGroup');
const renameGroup = require('./renameGroup');
const addNewUserGroup = require('./addNewUser');
const removeFromGroup = require('./removeFromGroup');


router.use('/chats',auth, createChat)  //creating new chat
router.use('/chats',auth, getChat);   //accessing chats

router.use('/chats/group',auth, createGroupChat)  //creating new createGroupChat
router.use('/chats/group',auth, renameGroup)  //renaming group
router.use('/chats/group',auth, addNewUserGroup)  //adding  new user to group
router.use('/chats/group',auth, removeFromGroup)  //removing someone from group





module.exports = router;