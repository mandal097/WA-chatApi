const router = require('express').Router();
const Chat = require('../../../models/Chat');

router.put('/rename-group', async (req, res) => {
    const { chatId, chatName } = req.body;
    if (!chatName) {
        return res.json({
            status: 'err',
            message: 'New name is required for the group'
        })
    };

    try {
        const updatedChat = await Chat.findByIdAndUpdate(chatId, {
            $set: {
                chatName: chatName
            }
        },
            { new: true }
        ).populate('users', '-password').populate('groupAdmin', '-password')

        if (!updatedChat) {
            return res.json({
                status: 'err',
                message: 'Chat not found'
            })
        } else {
            res.status(200).json({
                status: 'success',
                message: 'Successfully updated name',
                data: updatedChat
            });
        }
    } catch (error) {
        res.json({
            status: 'err',
            message: 'something went wrong',
            error: error
        })
    }
})



module.exports = router;