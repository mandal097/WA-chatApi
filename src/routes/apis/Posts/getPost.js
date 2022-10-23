const router = require('express').Router();
const Post = require('../../../models/Post');


// getting post by id
router.get('/get/:postId', async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await Post.findOne({ _id: postId })
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