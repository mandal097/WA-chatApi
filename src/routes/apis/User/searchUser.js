const User = require('../../../models/User');

const router = require('express').Router();

router.get('/search', async (req, res) => {
    const query = req.query.q;
    try {
        const users = await User.find({
            $or: [
                { name: { $regex: query, $options: '$i', } },
                { email: { $regex: query, $options: '$i', } },
            ],
        })
        res.json({
            status: 'success',
            data: users
        })
    } catch (error) {
        res.status(500).json({
            status: 'err',
            message: 'Something went wrong',
            error
        })
    }
})

module.exports = router;