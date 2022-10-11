const router = require('express').Router();
const auth = require('../../../middleware/auth');
const sendMessage = require('./sendMessage');
const getMessage = require('./getMessage');


router.use('/message', auth, sendMessage);  //sending the message 
router.use('/message', auth, getMessage);  //get message from friend


module.exports = router;