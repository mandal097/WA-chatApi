const router = require('express').Router();

const Group = require('../../../../models/Group');
const User = require('../../../../models/User');


//for getting list of users, who are not member of the group
router.get('/get-list/:groupId', async (req, res) => {
    const { groupId } = req.params;

    const group = await Group.findById({ _id: groupId });
    if (!group) {
        return res.json({
            status: 'err',
            message: 'Group not found'
        });
    };

    try {
        const membersId = group.members;
        const list = await User.find({ _id: { $nin: membersId } }).select('name profilePic')
        return res.json({
            status: 'success',
            message: 'Successfuly fetched the list',
            data: list
        })
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            message: 'Something went wrong',
        })
    }
})



//for inviting user to groups by admins
router.put('/invite-member/:groupId', async (req, res) => {
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

    if (checkIsMember) {
        return res.json({
            status: 'err',
            message: 'Already a member of this group'
        });
    };

    const checkAlreadyRequested = group.membersInvited.includes(memberId)
    if (checkAlreadyRequested) {
        return res.json({
            status: 'err',
            message: 'Already invited'
        });
    };

    const obj = {
        role: 'member_request',
        groupId: groupId,
        invitedBy: userId
    }

    try {
        await group.updateOne({
            $push: { membersInvited: memberId }
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



//cancel admin-invited  by admins
router.put('/cancel-member-invite/:groupId', async (req, res) => {
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
            message: 'Only admin have access to remove user'
        });
    };

    const checkAlreadyRequested = group.membersInvited.includes(memberId)
    if (!checkAlreadyRequested) {
        return res.json({
            status: 'err',
            message: 'User not invited'
        });
    };

    try {
        await group.updateOne({
            $pull: { membersInvited: memberId }
        })
        await User.findByIdAndUpdate(memberId, {
            $pull: { groupInvites: { role: 'member_request', groupId: groupId } }
        })
        return res.json({
            status: 'success',
            message: 'Successfuly removed',
        })
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            message: 'Something went wrong',
        })
    }
})

module.exports = router;