const Group = require('../../../../models/Group');

const router = require('express').Router();

router.put('/groupId', async (req, res) => {
    const userId = req.payload.id;
    const { groupId } = req.params;
    // const { groupName, groupCoverImg, visibility, isPrivate, desc } = req.body;

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
    }

    try {

        return res.json({
            status: 'success',
            message: 'Successfuly updated',
        })
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            message: 'Something went wrong',
        })
    }
})

module.exports = router;