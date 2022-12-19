const router = require('express').Router();
const User = require('../../../models/User');
const Group = require('../../../models/Group');

//accepting invite for member
router.put('/:groupId/accept-member-invite', async (req, res) => {
    const userId = req.payload.id;
    const { groupId } = req.params;

    const user = await User.findById(userId);
    const group = await Group.findById(groupId);

    if (!user) {
        return res.json({
            status: 'err',
            message: 'user not found'
        })
    };

    const userInUsers_GroupInvites = user.groupInvites;
    const userInGroups_MembersInvited = group.membersInvited

    const checkUserInUsers_GroupInvites = userInUsers_GroupInvites.some((ele) => {
        return ele.role === 'member_request' && String(ele.groupId) === String(groupId)
    })

    const checkUserInGroups_MembersInvites = userInGroups_MembersInvited.includes(userId);

    if (!checkUserInUsers_GroupInvites && !checkUserInGroups_MembersInvites) {
        return res.json({
            status: 'err',
            message: 'Something went wrong or not invited',
        })
    }
    try {
        await group.updateOne({
            $pull: { membersInvited: userId }
        });
        await user.updateOne({
            $pull: { groupInvites: { role: 'member_request', groupId: groupId } }
        });
        await group.updateOne({
            $push: { members: userId }
        });

        return res.json({
            status: 'success',
            message: 'Invitation accepted',
        })
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            message: 'Something went wrong',
        })
    }
});




//cancelling invite for member
router.put('/:groupId/cancel-member-invite', async (req, res) => {
    const userId = req.payload.id;
    const { groupId } = req.params;

    const user = await User.findById(userId);
    const group = await Group.findById(groupId);

    if (!user) {
        return res.json({
            status: 'err',
            message: 'user not found'
        })
    };

    const userInUsers_GroupInvites = user.groupInvites;
    const userInGroups_MembersInvited = group.membersInvited

    const checkUserInUsers_GroupInvites = userInUsers_GroupInvites.some((ele) => {
        return ele.role === 'member_request' && String(ele.groupId) === String(groupId)
    })

    const checkUserInGroups_MembersInvites = userInGroups_MembersInvited.includes(userId);

    if (!checkUserInUsers_GroupInvites && !checkUserInGroups_MembersInvites) {
        return res.json({
            status: 'err',
            message: 'Something went wrong or not invited',
        })
    }
    try {
        await group.updateOne({
            $pull: { membersInvited: userId }
        });
        await user.updateOne({
            $pull: { groupInvites: { role: 'member_request', groupId: groupId } }
        });

        return res.json({
            status: 'success',
            message: 'Invitation cancelled',
        })
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            message: 'Something went wrong',
        })
    }
});




module.exports = router;