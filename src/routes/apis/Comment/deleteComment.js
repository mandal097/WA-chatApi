const router = require('express').Router();
const Comment = require('../../../models/Comment');
// const Post = require('../../../models/Post');


router.delete('/delete/:commentId', async (req, res) => {
    const { commentId } = req.params;
    const { id } = req.payload;
    const comment = await Comment.findById(commentId)
    if (!comment) {
        return res.json({
            status: 'success',
            message: 'Comment not found',
        })
    }
    const isOwner = String(id) === String(comment.userId)
    if (!isOwner) {
        return res.json({
            status: 'success',
            message: 'You can only delete your comment',
        })
    }
    try {
        await comment.deleteOne()

        return res.json({
            status: 'success',
            message: 'Successfully deleted comment',
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