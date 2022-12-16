const router = require('express').Router();
const Group = require('../../../../models/Group');

//add user to the group
router.put('/confirm-r/:groupId', async (req, res) => {
    const userId = req.payload.id;
    const { groupId } = req.params;
    const { requestedId } = req.body

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
            message: 'Only admin can handle requests'
        });
    };

    const isRequested = group.membersRequests.includes(requestedId) //checking if requested Id is available or not

    if (!isRequested) {
        return res.json({
            status: 'err',
            message: 'No request found for this requested ID'
        });
    }

    try {
        await group.updateOne({
             $push: { members: requestedId }
         }, { new: true });

        await group.updateOne({
             $pull: { membersRequests: requestedId }
         }, { new: true });
        
        return res.json({
            status: 'success',
            message: 'Successfuly added',
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

//remove user to the group
router.put('/remove-r/:groupId', async (req, res) => {
    const userId = req.payload.id;
    const { groupId } = req.params;
    const { requestedId } = req.body

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
            message: 'Only admin can handle requests'
        });
    };

    const isRequested = group.membersRequests.includes(requestedId) //checking if requested Id is available or not

    if (!isRequested) {
        return res.json({
            status: 'err',
            message: 'No request found for this requested ID'
        });
    }

    try {
        await group.updateOne({
             $pull: { membersRequests: requestedId }
         }, { new: true });
        
        return res.json({
            status: 'success',
            message: 'Successfuly deleted',
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