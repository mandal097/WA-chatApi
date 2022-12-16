const router = require('express').Router();
const Group = require('../../../../models/Group');

router.post('', async (req, res) => {
    const userId = req.payload.id;

    const { groupName, members } = req.body;
    if (!groupName) {
        return res.json({
            status: 'err',
            message: 'Group Name fields is required'
        })
    }

    if (members.length > 1) {
        members.unshift(userId);
    } else {
        members.push(userId)
    }

    try {
        const group = new Group({ ...req.body, admins: [userId], members: members });
        const savedGroup = await group.save();
        return res.json({
            status: 'success',
            message: 'Group successfuly created',
            data: savedGroup
        })
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            status: 'err',
            message: 'Something went wrong',
        })
    }
})



module.exports = router;