const router = require('express').Router();
const Group = require('../../../models/Group');


router.get('', async (req, res) => {
    try {
        const groups = await Group.find();
        if (!groups) {
            return res.json({
                status: 'err',
                message: 'groups not found'
            });
        } else {
            return res.json({
                status: 'success',
                data: groups
            });
        };
    } catch (error) {
        return res.json({
            status: 'err',
            message: 'Something went wrong'
        })
    }
})

module.exports = router;