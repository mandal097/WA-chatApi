const Post = require('../../../models/Post');

const router = require('express').Router();

router.delete('/delete/:postId', async (req, res) => {
    const { postId } = req.params;
    const post = await Post.findOne({ _id: postId })
    if (!post) {
        return res.json({
            status: 'err',
            message: 'Post not found'
        })
    }
    const isOwner = String(post.userId) === String(req.payload.id)
    if (!isOwner) {
        return res.json({
            status: 'err',
            message: 'Only owner can delete this post'
        })
    }
    try {
        await post.delete()
        return res.json({
            status: 'err',
            message: 'Post deleted successfully'
        })
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            message: 'something went wrong'
        })
    }
})


module.exports = router;