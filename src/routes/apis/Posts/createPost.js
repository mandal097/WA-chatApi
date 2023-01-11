const router = require('express').Router();
const User = require('../../../models/User');
const Post = require('../../../models/Post');
const Group = require('../../../models/Group');

router.post('/create', async (req, res) => {
    // const userId = req.payload.id;
    const { userId, mediaUrl, tags, text, mediaType } = req.body;
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
                text: text,
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


// creating post for group
router.post('/create-group-post/:groupId', async (req, res) => {
    const { groupId } = req.params;
    const { userId, mediaUrl, tags, text, mediaType } = req.body;
    if (!userId || !mediaUrl) {
        return res.json({
            status: 'err',
            message: 'All fields are required'
        })
    }

    const user = await User.findOne({ _id: userId });
    const group = await Group.findOne({ _id: groupId });

    if (!user) {
        return res.json({
            status: 'err',
            message: 'User not found'
        })
    }
    if (!group) {
        return res.json({
            status: 'err',
            message: 'Group not found'
        })
    };

    const isGroupMember = group.members.includes(userId); //checking for user is member of this group or not
    const isGroupAdmin = group.admins.includes(userId); //checking for user is admin
    const groupPrivacy = group.isPrivate //checkin wheather the group is private or public

    try {
        const post = new Post({
            userId,
            mediaUrl: mediaUrl,
            text: text,
            tags: tags,
            mediaType,
            isGroupPost: true,
            groupId
        });

        if (isGroupAdmin) {
            const savedPost = await post.save();
            return res.json({
                status: 'success',
                message: 'Post successfuly created ',
                data: savedPost
            })
        };


        if (groupPrivacy === 'public' && !isGroupMember) {
            const savedPost = await post.save();
            await group.updateOne({
                $push: { pendingPost: savedPost._id }
            })
            return res.json({
                status: 'success',
                message: 'Post successfuly created ',
                data: savedPost
            })
        };



        if (groupPrivacy === 'public' && isGroupMember) {
            const savedPost = await post.save();
            return res.json({
                status: 'success',
                message: 'Post successfuly created ',
                data: savedPost
            })
        };


        if (groupPrivacy === 'private' && !isGroupMember) {
            return res.json({
                status: 'err',
                message: 'Only members can post in this group',
            })
        };


        if (groupPrivacy === 'private' && isGroupMember) {
            const savedPost = await post.save();
            await group.updateOne({
                $push: { pendingPost: savedPost._id }
            })
            return res.json({
                status: 'success',
                message: 'Post created successfully',
                data: savedPost
            })
        };



    } catch (error) {
        return res.status(500).json({
            status: 'err',
            message: 'Something went wrong'
        })
    }
})



module.exports = router;