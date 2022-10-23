const Comment = require('../../../models/Comment');

const router = require('express').Router();

router.post('/:postId', async (req, res) => {
    const { commentText } = req.body;
    const { postId } = req.params;
    const { id } = req.payload // loggedn in user id
    if (!commentText) {
        return res.json({
            status: 'err',
            message: 'Please write something'
        });
    };
    try {
        const comment = new Comment({
            postId,
            userId:id,
            commentText
        })
        const saveComment = await comment.save();
        console.log(comment);
        return res.json({
            status: 'success',
            message: 'Successfully commented',
            data:saveComment
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