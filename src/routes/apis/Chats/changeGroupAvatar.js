const router = require('express').Router();
const Chat = require('../../../models/Chat');

router.put('/change-avatar', async (req, res) => {
    const { groupAvatar ,chatId} = req.body;
    const userId = req.payload.id;
    if (!groupAvatar) {
        return res.json({
            status: 'err',
            message: 'Please choose your avatar'
        })
    };

    try {
        const chat = await Chat.findOne({ _id: chatId }).populate('groupAdmin', '_id name');
        const checkIsAdmin = chat.groupAdmin._id == userId;
        if (!checkIsAdmin) {
            return res.json({
                status: 'err',
                message: 'Only admin can change this group avatar'
            });
        }
        const updatedChat = await Chat.findByIdAndUpdate(chatId, {
            $set: {
                groupAvatar: groupAvatar
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
            return res.status(200).json({
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