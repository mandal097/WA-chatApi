const router = require('express').Router();
const Message = require('../../../models/Message');

router.post('/', async (req, res) => {
    const { chatId, content } = req.body;
    if (!content || !chatId) {
        return res.json({
            status: 'err',
            message: 'Invalid data'
        });
    }

    try {
        const newMessage = new Message({
            sender: req.payload.id,
            content,
            chatId
        });
        const savedMessage = await newMessage.save();

        return res.json({
            status: 'success',
            message: 'Message sent',
            // data: savedMessage
            data: {
                sender: { _id: req.payload.id },
                content,
                chatId
            }
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