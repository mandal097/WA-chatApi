const router = require('express').Router();
const Post = require('../../../models/Post');


router.put('/update/:postId', async (req, res) => {
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
            message: 'Only owner can update this post'
        })
    }
    try {
        await post.updateOne({
            $set: req.body
        })
        res.json({
            status: 'err',
            message: 'Post updated successfully'
        })
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            message: 'something went wrong'
        })
    }
})


// for updating tagged users
router.put('/update-tags/:postId', async (req, res) => {
    const { postId } = req.params;
    const { tags } = req.body;
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
            message: 'Only owner can update this post'
        })
    }
    try {
        await post.updateOne({
            $push: { tags: tags }
        })
        res.json({
            status: 'err',
            message: 'Tags updated successfully'
        })
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            message: 'something went wrong'
        })
    }
})


module.exports = router;