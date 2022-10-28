const router = require('express').Router();
const User = require('../../../models/User');
const Post = require('../../../models/Post');

router.post('/create', async (req, res) => {
    // const userId = req.payload.id;
    const { userId,mediaUrl, tags,text ,mediaType} = req.body;
    if (!userId || !mediaUrl) {
        return res.json({
            status: 'err',
            message: 'All fields are required'
        })
    }

    const user = await User.findOne({ _id: userId })
    if (!user) {
        return res.json({
            status: 'err',
            message: 'User not found'
        })
    } else {
        try {
            const post = new Post({
                userId,
                mediaUrl: mediaUrl,
                text:text,
                tags: tags,
                mediaType
            });
            const savedPost = await post.save();
            return res.json({
                status: 'success',
                message: 'Post successfuly created',
                data: savedPost
            })
        } catch (error) {
            return res.status(500).json({
                status: 'err',
                message: 'Something went wrong'
            })
        }
    }
})



module.exports = router;