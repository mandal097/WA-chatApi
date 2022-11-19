const router = require('express').Router();
const Group = require('../../../../models/Group');
const GroupRules = require('../../../../models/GroupRules');

router.delete('/:ruleId', async (req, res) => {
    const { ruleId } = req.params;
    const userId = req.payload.id

    const rule = await GroupRules.findById({ _id: ruleId });
    if (!rule) {
        return res.json({
            status: 'err',
            message: 'This rule may be deleted or refresh page'
        });
    }
    const group = await Group.findById({ _id: rule.groupId });
    if (!group) {
        return res.json({
            status: 'err',
            message: 'Group not found'
        });
    }

    const checkAdmin = group.admins.includes(userId)  //checking for the user is admin or not

    if (!checkAdmin) {
        return res.json({
            status: 'err',
            message: 'Only admin can update rules'
        });
    }

    try {
        await GroupRules.findByIdAndDelete({ _id: ruleId })
        return res.json({
            status: 'success',
            message: 'Successfuly deleted',
        })
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            message: 'Something went wrong',
        })
    }
    // }
})



module.exports = router;