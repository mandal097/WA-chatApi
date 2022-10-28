const router = require('express').Router();
const Post = require('../../../models/Post');


router.put('/like-dislike/:postId', async (req, res) => {
    const { postId } = req.params;
    const { id } = req.payload;
    const post = await Post.findById(postId);
    if (!post) {
        return res.json({
            status: 'success',
            message: 'no post found',
        })
    }
    try {
        if (!post.likes.includes(id)) {
            await post.updateOne({
                $push: { likes: id },
            }, { new: true })
            return res.json({
                status: 'success',
                message: 'Successfully like this post',
            })
        } else {
            await post.updateOne({
                $pull: { likes: id },
            }, { new: true })
            return res.json({
                status: 'success',
                message: 'Successfully dislike this post',
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