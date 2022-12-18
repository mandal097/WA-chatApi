const router = require('express').Router();
const Group = require('../../../../models/Group');
const User = require('../../../../models/User');

//removing members from group
router.put('/remove/:groupId', async (req, res) => {
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
            message: 'Only admin have access to modify group'
        });
    };

    const isMember = group.members.includes(memberId);

    if (!isMember) {
        return res.json({
            status: 'err',
            message: 'Member not found'
        });
    }

    const isAdmin = group.admins.includes(memberId);

    if (isAdmin) {
        return res.json({
            status: 'err',
            message: 'He is admin please remove him from admins list'
        });
    };

    try {
        if (group.adminsInvited.includes(memberId)) {
            await group.updateOne({
                $pull: { adminsInvited: memberId }
            }, { new: true });

            await User.findByIdAndUpdate(memberId, {
                $pull: { groupInvites: { role: 'admin_request', groupId: groupId } }
            })
        }

        await group.updateOne({
            $pull: { members: memberId }
        }, { new: true });

        return res.json({
            status: 'success',
            message: 'Successfuly removed from group',
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'err',
            message: 'Something went wrong',
        })
    }
    // }
})



module.exports = router;