const router = require('express').Router();
const Post = require('../../../models/Post');
const Group = require('../../../models/Group');
const User = require('../../../models/User');

// getting posts to show on feed page of the particular user
router.get('/get-feed-posts', async (req, res) => {
    try {
        const user = await User.findById(req.payload.id);
        const followedFriends = [...user.followings, ...Array(req.payload.id)]

        const list = await Promise.all(
            followedFriends.map(userId => {
                return Post.find({ userId: userId, isGroupPost: false })
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
router.get('/my-posts/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const post = await Post.find({ userId: userId, isGroupPost: false })
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


// getting all  posts in particular group
router.get('/group-posts/:groupId', async (req, res) => {
    const { groupId } = req.params;
    try {

        const group = await Group.find({ _id: groupId });
        if (!group) {
            return res.json({
                status: 'err',
                message: 'group not found'
            });
        }

        const post = await Post.find({ groupId: groupId, isGroupPost: true });

        const pendingPostIds = group[0].pendingPost;
        allPostIds = post.map(ele => ele._id);
        approvedPosts = allPostIds.filter(ids => !pendingPostIds.includes(ids)); //approved posts ids

        // console.log(allPostIds);
        // console.log(pendingPostIds);
        // console.log(approvedPosts);

        const list = await Promise.all(
            approvedPosts?.map(postId => {
                return Post.find({ _id: postId })
                    .populate('userId', 'name profilePic')
                    .populate('tags', 'name profilePic')
            })
        )

        const posts = list.flat()
            .sort((a, b) => a.createdAt - b.createdAt);

        return res.json({
            status: 'success',
            message: 'Successfully get posts',
            data: posts
        })
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            message: 'Something went wrong'
        })
    }
})


// get all group posts

router.get('/all-group-posts', async (req, res) => {
    try {
        const post = await Post.find({ isGroupPost: true, isPrivate: "public" , visibility:"visible" })
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
        const post = await Post.find({ isGroupPost: false })
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