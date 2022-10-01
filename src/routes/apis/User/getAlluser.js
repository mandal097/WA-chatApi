const User = require('../../../models/User');

const router = require('express').Router();

router.get('/get-all-users', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({
            status: 'success',
            data: users
        })
    } catch (error) {
        res.status(500).json({
            status: 'err',
            message: 'Something went wrong'
        })
    }
});

module.exports = router;
