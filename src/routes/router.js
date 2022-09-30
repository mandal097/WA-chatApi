const router = require('express').Router();
const userRoutes = require('./apis/User/_router')

router.use('/user',userRoutes)

module.exports = router;