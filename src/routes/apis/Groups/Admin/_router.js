const router = require('express').Router();

const createGroup = require('./createGroup');

router.use('/create', createGroup);



module.exports = router;