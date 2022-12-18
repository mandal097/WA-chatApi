const router = require('express').Router();
const User = require('../../../models/User');
const Group = require('../../../models/Group');


//getting all group requests for admin
router.get('/invited-users', async (req, res) => {
    const userId = req.payload.id;

    const user = await User.findById(userId)
        .populate({
            path: 'groupInvites',
            populate: {
                path: 'groupId',
                select: 'groupName groupCoverImg'
            }
        })
        .populate({
            path: 'groupInvites',
            populate: {
                path: 'invitedBy',
                select: 'name profilePic'
            }
        })
    if (!user) {
        return res.json({
            status: 'err',
            message: 'user not found'
        })
    };
    try {
        return res.json({
            status: 'success',
            message: 'Successfully get the list of invites',
            data: user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'err',
            message: 'Something went wrong',
        })
    }
});



module.exports = router;