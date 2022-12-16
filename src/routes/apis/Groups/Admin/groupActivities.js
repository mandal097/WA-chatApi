const router = require('express').Router();
const Group = require('../../../../models/Group');
const GroupActivityLog = require('../../../../models/GroupActivityLog');

// creating log
router.post('', async (req, res) => {
    const userId = req.payload.id;
    const { groupId, title } = req.body;

    if (!groupId || !title) {
        return res.json({
            status: 'err',
            message: 'All fields are required'
        })
    }

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
            message: 'Only admin can make changes to the group'
        });
    }

    try {
        const groupActivity = new GroupActivityLog({
            groupId,
            adminId: userId,
            title,
        });
        const savedgroupActivity = await groupActivity.save();
        return res.json({
            status: 'success',
            message: 'Activity logged successfuly',
            data: savedgroupActivity
        })
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            message: 'Something went wrong',
        })
    }
    // }
})


// getting logs
router.get('/:groupId', async (req, res) => {
    const { groupId } = req.params;

    const group = await Group.findById({ _id: groupId });
    if (!group) {
        return res.json({
            status: 'err',
            message: 'Group not found'
        });
    }

    try {
        const activities = await GroupActivityLog.find({ groupId: groupId })

            .populate('adminId', 'name profilePic')
        return res.json({
            status: 'success',
            message: 'Group activities successfuly fetched',
            data: activities.sort((a, b) => b.createdAt - a.createdAt)
        })
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            status: 'err',
            message: 'Something went wrong',
        })
    }
    // }
});


// adding note to the logs

router.put('/notes/:groupId', async (req, res) => {
    const { groupId } = req.params;
    const { actionId } = req.body;
    const adminId = req.payload.id

    const group = await Group.findById({ _id: groupId });
    if (!group) {
        return res.json({
            status: 'err',
            message: 'Group not found'
        });
    }

    const checkAdmin = group.admins.includes(adminId);
    if (!checkAdmin) {
        return res.json({
            status: 'err',
            message: 'Only admin can make changes'
        });
    }
    try {
        const note = await GroupActivityLog.findByIdAndUpdate(actionId, {
            $set: req.body
        }, { new: true });
        return res.json({
            status: 'success',
            message: 'Notes added successfuly',
            data: note
        })
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            status: 'err',
            message: 'Something went wrong p',
        })
    }
    // }
});





module.exports = router;