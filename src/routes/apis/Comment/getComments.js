const router = require('express').Router();
const Comment = require('../../../models/Comment');
const Post = require('../../../models/Post');


router.get('/:postId', async (req, res) => {
    const { postId } = req.params;
    const post = await Post.findById(postId)
    if(!post){
        return res.json({
            status: 'success',
            message: 'Post not found',
        })
    }
    try {
        const comments = await Comment.find({ postId: postId })
        .populate('userId' , 'name profilePic')
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