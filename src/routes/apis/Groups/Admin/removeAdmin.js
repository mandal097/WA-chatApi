const router = require('express').Router();
const Group = require('../../../../models/Group');

// for exit from the group 
router.put('/:groupId', async (req, res) => {
    const userId = req.payload.id; //logged in user id
    const { groupId } = req.params;
    const {memberId} = req.body;

    const group = await Group.findById({ _id: groupId });
    if (!group) {
        return res.json({
            status: 'err',
            message: 'Group not found'
        });
    }

    const checkAdmin = group.admins.includes(userId)  //checking for the user is admin 
    if (!checkAdmin) {
        return res.json({
            status: 'success',
            message: 'Only admin remove another admin',
        })
    }
    
    try {
            await group.updateOne({
                $pull: { admins: memberId }
            }, { new: true });

            return res.json({
                status: 'success',
                message: 'Successfuly removed from the admin role',
            });
    } catch (error) {
        return res.json({
            status: 'err',
            message: 'Something went wrong'
        })
    }
})

module.exports = router;