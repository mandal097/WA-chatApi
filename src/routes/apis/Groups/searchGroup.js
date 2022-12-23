const Group = require('../../../models/Group');

const router = require('express').Router();

router.get('/search', async (req, res) => {
    const query = req.query.q;
    const count = req.query.count;
    try {
        const groups = await Group.find({
            groupName: { $regex: query, $options: '$i', },
            visibility:'visible'
        }).limit(count)
        res.json({
            status: 'success',
            data: groups
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