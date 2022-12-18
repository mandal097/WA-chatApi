const router = require('express').Router();
const User = require('../../../models/User');
const Group = require('../../../models/Group');

//accepting invite for admin
router.put('/:groupId/accept-admin-invite', async (req, res) => {
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
    const userInGroups_AdminInvites = group.adminsInvited

    const checkUserInUsers_GroupInvites = userInUsers_GroupInvites.some((ele) => {
        return ele.role === 'admin_request' && String(ele.groupId) === String(groupId)
    })

    const checkUserInGroups_AdminInvites = userInGroups_AdminInvites.includes(userId);

    if (!checkUserInUsers_GroupInvites && !checkUserInGroups_AdminInvites) {
        return res.json({
            status: 'err',
            message: 'Something went wrong or not invited',
        })
    }
    try {
        await group.updateOne({
            $pull: { adminsInvited: userId }
        });
        await user.updateOne({
            $pull: { groupInvites: { role: 'admin_request', groupId: groupId } }
        });
        await group.updateOne({
            $push: { admins: userId }
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




//cancelling invite for admin
router.put('/:groupId/cancel-admin-invite', async (req, res) => {
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
    const userInGroups_AdminInvites = group.adminsInvited

    const checkUserInUsers_GroupInvites = userInUsers_GroupInvites.some((ele) => {
        return ele.role === 'admin_request' && String(ele.groupId) === String(groupId)
    })

    const checkUserInGroups_AdminInvites = userInGroups_AdminInvites.includes(userId);

    if (!checkUserInUsers_GroupInvites && !checkUserInGroups_AdminInvites) {
        return res.json({
            status: 'err',
            message: 'Something went wrong or not invited',
        })
    }
    try {
        await group.updateOne({
            $pull: { adminsInvited: userId }
        });
        await user.updateOne({
            $pull: { groupInvites: { role: 'admin_request', groupId: groupId } }
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