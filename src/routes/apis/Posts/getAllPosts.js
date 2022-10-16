const router = require('express').Router();
const Post = require('../../../models/Post');

router.get('/get-all-posts', async (req, res) => {
    try {
        const post = await Post.find().sort({ createdAt: -1 })
            .populate('userId', 'name profilePic')
            .populate('tags', 'name profilePic')
        if (!post) {
            return res.json({
                status: 'err',
                message: 'Post not found'
            })
        } else {
            return res.json({
                status: 'err',
                message: 'Successfully get a post',
                data: post
            })

        }
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            message: 'Something went wrong'
        })
    }

})



module.exports = router;