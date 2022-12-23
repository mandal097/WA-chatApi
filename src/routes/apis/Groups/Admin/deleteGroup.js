const router = require('express').Router();
const Group = require('../../../../models/Group');

// for exit from the group 
router.delete('/:groupId', async (req, res) => {
    const userId = req.payload.id; //logged in user id
    const { groupId } = req.params;

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
            message: 'Only admins can delete the group',
        })
    }

    try {
        await Group.findByIdAndDelete(groupId)

        return res.json({
            status: 'success',
            message: 'Group deleted successfully'
        })
    } catch (error) {
        return res.json({
            status: 'err',
            message: 'Something went wrong'
        })
    }
})

module.exports = router;