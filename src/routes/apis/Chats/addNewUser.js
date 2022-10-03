const router = require('express').Router();
const Chat = require('../../../models/Chat');

router.put('/add-new-user', async (req, res) => {
    const { chatId, userId } = req.body;
    if (!chatId) return res.json({ status: 'err', message: 'chat id is required' });
    if (!userId) return res.json({ status: 'err', message: 'user id is required' });



    try {
        const added = await Chat.findByIdAndUpdate(chatId, {
            $push: { users: userId }
        },
            { new: true }
        ).populate('users', '-password').populate('groupAdmin', '-password')

        if (!added) {
            return res.json({
                status: 'err',
                message: 'Chat not found'
            })
        } else {
            res.status(200).json({
                status: 'success',
                message: 'Successfully added new user',
                data: added
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