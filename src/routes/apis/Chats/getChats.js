const Chat = require('../../../models/Chat');
const User = require('../../../models/User');

const router = require('express').Router();

router.get('/get-chats', async (req, res) => {
    try {
        const chats = await Chat.find({ users: { $elemMatch: { $eq: req.payload.id } } })
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
                status: 'err',
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