const router = require('express').Router();
const Comment = require('../../../models/Comment');
const Post = require('../../../models/Post');


router.get('/replies/:parentCommentId', async (req, res) => {
    const { parentCommentId } = req.params;
 
    try {
        const comments = await Comment.find({
            $and: [{ parentCommentId: parentCommentId }, { isReply: true }]
        })
            .populate('userId', 'name profilePic')
            .populate('repliedTo', 'name profilePic')
        if (!comments) {
            return res.json({
                status: 'success',
                message: 'no comments',
            })
        } else {
            return res.json({
                status: 'success',
                message: 'Successfully get comments',
                data: comments
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            message: 'Something went wrong',
            error
        })
    }
});

module.exports = router;