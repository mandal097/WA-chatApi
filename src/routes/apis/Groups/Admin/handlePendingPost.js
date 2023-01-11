const router = require('express').Router();
const Group = require('../../../../models/Group');
const Post = require('../../../../models/Post');

router.put('/:groupId', async (req, res) => {
    const userId = req.payload.id //logged in user id
    const { groupId } = req.params
    const { postId, confirmation } = req.body;

    const group = await Group.findById({ _id: groupId });
    const post = await Post.findOne({ _id: postId })
    if (!group) {
        return res.json({
            status: 'err',
            message: 'group not found'
        });
    }

    if (!post) {
        return res.json({
            status: 'err',
            message: 'post not found'
        });
    }

    const checkAdmin = group.admins.includes(userId)  //checking for the user is admin or not

    if (!checkAdmin) {
        return res.json({
            status: 'err',
            message: 'Only admin have access to approve/decline posts'
        });
    }

    try {
        if (confirmation === false) {
            await group.updateOne({
                $pull: { pendingPost: postId }
            })
            await Post.deleteOne({ _id: postId })
            return res.json({
                status: 'success',
                message: 'Post successfully declined'
            })
        }
        if (confirmation === true) {
            await group.updateOne({
                $pull: { pendingPost: postId }
            })
            return res.json({
                status: 'success',
                message: 'Post successfully approved'
            })
        }

    } catch (error) {
        return res.json({
            status: 'err',
            message: 'Something went wrong my'
        })
    }
})

module.exports = router;