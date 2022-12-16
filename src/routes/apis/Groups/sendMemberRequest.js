const router = require('express').Router();
const Group = require('../../../models/Group');

router.put('/member-request/:groupId', async (req, res) => {
    const userId = req.payload.id;
    const { groupId } = req.params;

    const group = await Group.findById({ _id: groupId });
    if (!group) {
        return res.json({
            status: 'err',
            message: 'Group not found'
        });
    }
    
    const checkAlreadyMember = group.members.includes(userId);
    
    if(checkAlreadyMember){
        return res.json({
            status: 'err',
            message: 'Already a member of this group'
        });
    }
    
    const checkRequested = group.membersRequests.includes(userId);
    
    if(checkRequested){
        return res.json({
            status: 'err',
            message: 'Already requested'
        });
    };
    
    try {
        await group.updateOne({
            $push: { membersRequests: userId }
        }, { new: true })
        return res.json({
            status: 'success',
            message: 'Request successfully sent',
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