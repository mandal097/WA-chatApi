const router = require('express').Router();
const Chat = require('../../../models/Chat');

router.put('/remove-user', async (req, res) => {
    const { chatId, userId } = req.body;
    if (!chatId) return res.json({ status: 'err', message: 'chat id is required' });
    if (!userId) return res.json({ status: 'err', message: 'user id is required' });

    try {
        const removed = await Chat.findByIdAndUpdate(chatId, {
            $pull: { users: userId }
        },
            { new: true }
        ).populate('users', '-password').populate('groupAdmin', '-password')

        if (!removed) {
            return res.json({
                status: 'err',
                message: 'Chat not found'
            })
        } else {
            res.status(200).json({
                status: 'success',
                message: 'Successfully removed user',
                data: removed
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