const router = require('express').Router();
const User = require('../../../models/User');


// follow users
router.put('/follow', async (req, res) => {
    const { friendId } = req.body;
    const myId = req.payload.id;
    console.log(myId);
    try {
        //finding friend have to follow 
        const user = await User.findById(friendId);
        if (!user.followers.includes(myId)) {
            await user.updateOne({ $push: { followers: myId } }, { new: true })

            await User.findByIdAndUpdate({ _id: myId },
                { $push: { followings: friendId } }, { new: true })

            return res.status(201).json({
                status: "success",
                message: 'Successfully followed'
            })
        } else {
            return res.json({
                status: 'err',
                message: `Already in your Followings`
            })
        }
    } catch (error) {
        return res.status(501).json({
            status: 'err',
            message: `Server error-${error} `
        })
    }
})


// unfollow friends
router.put('/unfollow', async (req, res) => {
    const { friendId } = req.body;
    const myId = req.payload.id;
    try {
        //finding friend have to unfollow 
        const user = await User.findById(friendId);
        if (user.followers.includes(myId)) {
            await user.updateOne({ $pull: { followers: myId } }, { new: true })

            await User.findByIdAndUpdate({ _id: myId },
                { $pull: { followings: friendId } }, { new: true })

            return res.status(201).json({
                status: "success",
                message: 'Successfully unfollowed'
            })
        } else {
            return res.json({
                status: 'err',
                message: `Not  in your Followers`
            })
        }
    } catch (error) {
        return res.status(501).json({
            status: 'err',
            message: `Server error-${error} `
        })
    }
})

module.exports = router;








