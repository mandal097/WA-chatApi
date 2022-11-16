const router = require('express').Router();
const Group = require('../../../models/Group');


router.get('/:groupId', async (req, res) => {
    const { groupId } = req.params;
    try {
        const group = await Group.findById({ _id: groupId });
        if (!group) {
            return res.json({
                status: 'err',
                message: 'group not found'
            });
        } else {
            return res.json({
                status: 'success',
                data: group
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