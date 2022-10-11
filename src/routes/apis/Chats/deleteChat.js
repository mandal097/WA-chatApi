const router = require('express').Router();
const Chat = require('../../../models/Chat')
router.delete('/delete/:chatId', async (req, res) => {
    const { chatId } = req.params;
    const userId = req.payload.id
    const chat = await Chat.findOne({ _id: chatId }).populate('groupAdmin', '_id name')
    if (!chat) {
        return res.json({
            status: 'err',
            message: 'chat not found'
        })
    }
    const checkIsAdmin = chat.groupAdmin._id == userId

    if (!checkIsAdmin) {
        return res.json({
            status: 'err',
            message: 'Only admin can delete this group'
        });
    } else {
        await Chat.findByIdAndDelete(chatId);
        return res.json({
            status: 'success',
            message: 'successfully deleted chat'
        })

    }
});


module.exports = router;