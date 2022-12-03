const router = require('express').Router();
const Group = require('../../../models/Group');


router.get('/:groupId/members', async (req, res) => {
    const { groupId } = req.params;
    try {
        const groups = await Group.findOne({ _id: groupId })
        .populate('admins' ,'name profilePic')
        .populate('members' ,'name profilePic')
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
            message: 'Something went wrong p'
        })
    }
})

module.exports = router;