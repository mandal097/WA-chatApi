const router = require('express').Router();
const userRoutes = require('./apis/User/_router')

router.use('/', userRoutes); //test
router.use('/api', userRoutes); //user

module.exports = router;