const router = require('express').Router();
const Group = require('../../../../models/Group');
const GroupRules = require('../../../../models/GroupRules');

router.post('', async (req, res) => {
    const userId = req.payload.id;
    const { groupId, title, desc } = req.body;

    if (!groupId || !title || !desc) {
        return res.json({
            status: 'err',
            message: 'All fields are required'
        })
    }

    const group = await Group.findById({ _id: groupId });
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
        const GroupRule = new GroupRules({
            groupId,
            adminId: userId,
            title,
            desc
        });
        const savedGroupRule = await GroupRule.save();
        return res.json({
            status: 'success',
            message: 'Rule successfuly created',
            data: savedGroupRule
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