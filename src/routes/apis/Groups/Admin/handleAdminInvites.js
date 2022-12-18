const router = require('express').Router();

const Group = require('../../../../models/Group');
const User = require('../../../../models/User');


//for inviting user to groups by admins
router.put('/invite/:groupId', async (req, res) => {
    const userId = req.payload.id;
    const { groupId } = req.params;
    const { memberId } = req.body;

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
            message: 'Only admin have access to invite user as admin'
        });
    };

    const checkIsMember = group.members.includes(memberId)  //checking the user to be invited is member of the group or not

    if (!checkIsMember) {
        return res.json({
            status: 'err',
            message: 'Not a member of the group / may be removed from the group'
        });
    };

    const checkAlreadyAdmin = group.admins.includes(memberId)  //checking the user to be invited is not already a admin of the group

    if (checkAlreadyAdmin) {
        return res.json({
            status: 'err',
            message: 'Already a admin of the group '
        });
    };

    const checkAlreadyRequested = group.adminsInvited.includes(memberId)
    if (checkAlreadyRequested) {
        return res.json({
            status: 'err',
            message: 'Already invited'
        });
    };

    const obj = {
        role: 'admin_request',
        groupId: groupId,
        invitedBy:userId
    }

    try {
        await group.updateOne({
            $push: { adminsInvited: memberId }
        })
        await User.findByIdAndUpdate(memberId, {
            $push: { groupInvites: obj }
        })
        return res.json({
            status: 'success',
            message: 'Successfuly invited',
        })
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            message: 'Something went wrong',
        })
    }
})



//cancel admi-invited  by admins
router.put('/cancel-invite/:groupId', async (req, res) => {
    const userId = req.payload.id;
    const { groupId } = req.params;
    const { memberId } = req.body;

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
            message: 'Only admin have access to invite user as admin'
        });
    };

    const checkAlreadyRequested = group.adminsInvited.includes(memberId)
    if (!checkAlreadyRequested) {
        return res.json({
            status: 'err',
            message: 'User not invited'
        });
    };

    try {
        await group.updateOne({
            $pull: { adminsInvited: memberId }
        })
        await User.findByIdAndUpdate(memberId, {
            $pull: { groupInvites: { role: 'admin_request', groupId: groupId } }
        })
        return res.json({
            status: 'success',
            message: 'Successfuly invited',
        })
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            message: 'Something went wrong',
        })
    }
})

module.exports = router;