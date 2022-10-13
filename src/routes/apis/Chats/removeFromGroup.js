const router = require('express').Router();
const Chat = require('../../../models/Chat');

// removing user from group
router.put('/remove-user', async (req, res) => {
    const { chatId, userId } = req.body;
    const id = req.payload.id
    if (!chatId) return res.json({ status: 'err', message: 'chat id is required' });
    if (!userId) return res.json({ status: 'err', message: 'user id is required' });

    try {
        const chat = await Chat.findOne({ _id: chatId }).populate('groupAdmin', '_id name')
        if (!chat) {
            return res.json({
                status: 'err',
                message: 'chat not found'
            })
        }
        const checkIsAdmin = chat.groupAdmin._id == id

        if (!checkIsAdmin) {
            return res.json({
                status: 'err',
                message: 'Only admin can remove this user from group'
            });
        } else {
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
                    message: 'Successfully leaved tehe group',
                    data: removed
                });
            }
        }
    } catch (error) {
        res.json({
            status: 'err',
            message: 'something went wrong',
            error: error
        })
    }
})


//user exited from group own their own
router.put('/exit-group', async (req, res) => {
    const { chatId, userId } = req.body;
    const id = req.payload.id
    if (!chatId) return res.json({ status: 'err', message: 'chat id is required' });
    if (!userId) return res.json({ status: 'err', message: 'user id is required' });

    try {
        const chat = await Chat.findOne({ _id: chatId }).populate('groupAdmin', '_id name')
        if (!chat) {
            return res.json({
                status: 'err',
                message: 'chat not found'
            })
        }
        const checkIsAdmin = chat.groupAdmin._id == id

        if (checkIsAdmin) {
            return res.json({
                status: 'err',
                message: 'You are admin you have to delete the group'
            });
        } else {
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
                    message: 'Successfully leaved tehe group',
                    data: removed
                });
            }
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