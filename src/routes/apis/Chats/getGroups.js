const Chat = require('../../../models/Chat');
const User = require('../../../models/User');

const router = require('express').Router();

router.get('/get-groups', async (req, res) => {
    try {
        const chats = await Chat.find({
            users: { $elemMatch: { $eq: req.payload.id } },
            isGroupChat: true
        })
            .populate('users', '-password')
            .populate('groupAdmin', '-password')
            .populate('latestMessage')
            .sort({ updatedAt: -1 })
        if (!chats) {
            res.json({
                status: 'err',
                message: 'No chats',
            })
        } else {
            const fullChat = await User.populate(chats, {
                path: "latestMessage.sender",
                select: "name profilePic email"
            })
            res.json({
                status: 'success',
                message: 'Chats fetched',
                data: fullChat
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 'err',
            message: 'something went wrong',
            error
        })
    }
})



module.exports = router;