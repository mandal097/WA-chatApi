const router = require('express').Router();
const Group = require('../../../../models/Group');
const GroupRules = require('../../../../models/GroupRules');

router.get('/:groupId', async (req, res) => {
    const { groupId } = req.params;

    const group = await Group.findById({ _id: groupId });
    if (!group) {
        return res.json({
            status: 'err',
            message: 'Group not found'
        });
    }

    try {
        const rules = await GroupRules.find({ groupId: groupId }).populate('adminId', 'name')
        return res.json({
            status: 'success',
            message: 'Group rules successfuly fetched',
            data: rules
        })
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            status: 'err',
            message: 'Something went wrong',
        })
    }
    // }
})



module.exports = router;