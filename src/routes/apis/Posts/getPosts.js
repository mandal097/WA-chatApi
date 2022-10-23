const router = require('express').Router();
const Post = require('../../../models/Post');
const User = require('../../../models/User');

// getting posts to show on feed page of the particular user
router.get('/get-feed-posts', async (req, res) => {
    try {
        const user = await User.findById(req.payload.id);
        const followedFriends = user.followings;

        const list = await Promise.all(
            followedFriends.map(userId => {
                return Post.find({ userId: userId })
                    .populate('userId', 'name profilePic')
                    .populate('tags', 'name profilePic')
            })
        )
        const posts = list.flat()
            .sort((a, b) => b.createdAt - a.createdAt);

        return res.json({
            status: 'success',
            message: 'Successfully get feed posts',
            data: posts
        })
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            message: 'Something went wrong'
        })
    }
})



// getting all  posts of logged in user
router.get('/my-posts', async (req, res) => {
    try {
        const post = await Post.find({ userId: req.payload.id })
            .populate('userId', 'name profilePic')
            .populate('tags', 'name profilePic')
            .sort({ createdAt: -1 })
        if (!post) {
            return res.json({
                status: 'err',
                message: 'Post not found'
            })
        } else {
            return res.json({
                status: 'success',
                message: 'Successfully get posts',
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



// getting all posts maybe random posts , will work on this

router.get('/get-all-posts', async (req, res) => {
    try {
        const post = await Post.find()
            .populate('userId', 'name profilePic')
            .populate('tags', 'name profilePic')
            .sort({ createdAt: -1 })
        if (!post) {
            return res.json({
                status: 'err',
                message: 'Post not found'
            })
        } else {
            return res.json({
                status: 'success',
                message: 'Successfully get posts',
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