const router = require('express').Router();
const Post = require('../../../models/Post');


router.put('/save/:postId', async (req, res) => {
    const { postId } = req.params;
    const { id } = req.payload;
    console.log(id);
    const post = await Post.findOne({ _id: postId })
    if (!post) {
        return res.json({
            status: 'err',
            message: 'Post not found'
        })
    }

    try {
        if (!post.saved.includes(id)) {
            await post.updateOne({
                $push: { saved: id }
            }, { new: true })
            res.json({
                status: 'success',
                message: 'Post saved successfully',
                data: post
            })
        } else {
            await post.updateOne({
                $pull: { saved: id }
            }, { new: true })
            res.json({
                status: 'success',
                message: 'Post unsaved successfully'
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            message: 'something went wrong'
        })
    }
})


module.exports = router;