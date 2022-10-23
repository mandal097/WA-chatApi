const router = require('express').Router();
const Comment = require('../../../models/Comment');
const Post = require('../../../models/Post');


router.put('/like-dislike/:commentId', async (req, res) => {
    const { commentId } = req.params;
    const { id } = req.payload;
    const comment = await Comment.findById(commentId);
    // console.log(comment);
    if (!comment) {
        return res.json({
            status: 'success',
            message: 'no comments',
        })
    }
    try {
        if (!comment.likes.includes(id)) {
            await comment.updateOne({
                $push: { likes: id },
            }, { new: true })
            return res.json({
                status: 'success',
                message: 'Successfully like this comment',
            })
        } else {
            await comment.updateOne({
                $pull: { likes: id },
            }, { new: true })
            return res.json({
                status: 'success',
                message: 'Successfully dislike this comment',
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



// router.put('/dislike/:commentId', async (req, res) => {
//     const { commentId } = req.params;
//     const { id } = req.payload;
//     const comment = await Comment.findById(commentId);
//     if (!comment) {
//         return res.json({
//             status: 'success',
//             message: 'no comments',
//         })
//     }
//     try {
//         if (comment.likes.includes(id)) {
//             await comment.updateOne({
//                 $pull: { likes: id },
//             }, { new: true })
//             return res.json({
//                 status: 'success',
//                 message: 'Successfully dislike this comment',
//             })
//         } else {
//             return res.json({
//                 status: 'err',
//                 message: `Not  liked`
//             })
//         }

//     } catch (error) {
//         return res.status(500).json({
//             status: 'err',
//             message: 'Something went wrong',
//             error
//         })
//     }
// });

module.exports = router;