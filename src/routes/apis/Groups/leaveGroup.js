const router = require('express').Router();
const Group = require('../../../models/Group');

// for exit from the group 
router.put('/leave/:groupId', async (req, res) => {
    const userId = req.payload.id; //logged in user id
    const { groupId } = req.params;

    const group = await Group.findById({ _id: groupId });
    if (!group) {
        return res.json({
            status: 'err',
            message: 'Group not found'
        });
    }
    const checkIsMember = group.members.includes(userId)  //checking for the user is member or not
    if (!checkIsMember) {
        return res.json({
            status: 'err',
            message: 'Not even a member of this group',
        })
    }

    try {
        const checkAdmin = group.admins.includes(userId)  //checking for the user is admin 
        if (!checkAdmin) {
            await group.updateOne({
                $pull: { members: userId }
            }, { new: true })
            return res.json({
                status: 'success',
                message: 'Successfuly exited from the group',
            })
        }

        const adminsLength = group.admins.length;
        if (adminsLength <= 1) {
            await Group.findByIdAndDelete(groupId)

            return res.json({
                status: 'success',
                message: 'Group deleted successfully'
            })

        } else {
            await group.updateOne({
                $pull: { members: userId }
            }, { new: true });

            await group.updateOne({
                $pull: { admins: userId }
            }, { new: true });

            return res.json({
                status: 'success',
                message: 'Successfuly exited from the group',
            })
        }
    } catch (error) {
        return res.json({
            status: 'err',
            message: 'Something went wrong'
        })
    }
})

module.exports = router;