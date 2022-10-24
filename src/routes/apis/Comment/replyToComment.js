const Comment = require('../../../models/Comment');

const router = require('express').Router();

router.put('/reply/:commentId', async (req, res) => {
    const { replyText } = req.body;
    const { commentId } = req.params;
    const { id } = req.payload // logged in user id
    if (!replyText) {
        return res.json({
            status: 'err',
            message: 'Please write something'
        });
    };
    try {
        const obj = {
            repliedUserId: id,
            replyText
        }
        const updatedComment = await Comment.findOneAndUpdate({ _id: commentId }, {
            $push: { replies: obj }
        }, { new: true })
        // const saveComment = await comment.save();
        // console.log(comment);
        return res.json({
            status: 'success',
            message: 'Successfully commented',
            data: updatedComment
        })
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            message: 'Something went wrong',
            error
        })
    }
});

module.exports = router;