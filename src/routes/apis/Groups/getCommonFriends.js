const router = require('express').Router();
const Group = require('../../../models/Group');
const User = require('../../../models/User');



//getting common friends list in a group 
router.get('/common-friends/:groupId', async (req, res) => {
    const { groupId } = req.params;
    const userId = req.payload.id;
    const group = await Group.findById({ _id: groupId });
    const user = await User.findById({ _id: userId });

    if (!group) {
        return res.json({
            status: 'err',
            message: 'group not found'
        });
    }
    const { followings } = user;
    const groupMembers = group.members;
    
    const  commonFriends = followings.filter((ids) => groupMembers.includes(ids));
    try {

        return res.json({
            status: 'success',
            data: commonFriends
        });

    } catch (error) {
        return res.json({
            status: 'err',
            message: 'Something went wrong'
        })
    }
})

module.exports = router;