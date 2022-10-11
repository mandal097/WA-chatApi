const router = require('express').Router();
const Message = require('../../../models/Message');

router.get('/:chatId', async (req, res) => {
    try {
        const messages = await Message.find({ chatId: req.params.chatId })
            .populate('sender', 'name profilePic email');

        return res.json({
            status: 'success',
            message: 'Message fetched',
            data: messages
        })

    } catch (error) {
        return res.json({
            status: 'err',
            message: 'Something went wrong',
            error
        });
    };
})

module.exports = router;