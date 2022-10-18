const router = require('express').Router();
const Chat = require('../../../models/Chat')
const User = require('../../../models/User')

router.post('/create-chat', async (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.json({ status: 'err', message: 'Chat not found' });

    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.payload.id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    }).populate('users', '-password')
        .populate('latestMessage')

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: 'name profilePic email'
    })
    if (isChat.length > 0) {
        res.json({
            status: 'success',
            existed: true,
            message: 'chat is already existed',
            data: isChat
        });
    } else {
        let chatData = {
            chatName: 'sender',
            isGroupChat: false,
            users: [req.payload.id, userId]
        };
        try {
            const createdChat = new Chat(chatData);
            await createdChat.save();
            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                'users',
                "-password"
            );
            res.json({
                status: 'success',
                existed: false,
                message: 'Chat created',
                data: fullChat
            })
        } catch (error) {
            res.json({
                status: 'err',
                message: 'something went wrong',
                error: error
            })

        }
    }
})







module.exports = router;