const router = require('express').Router();
const Chat = require('../../../models/Chat')
const User = require('../../../models/User')

router.post('/create-group', async (req, res) => {
    const { users, name } = req.body;
    if (!users || !name) {
        return res.status(400).send({
            status: 'err',
            message: "Please Fill all the feilds"
        });
    }

    //   var users = JSON.parse(req.body.users);

    if (users.length < 2) {
        return res.status(400).send({
            status: 'err',
            message: "More than 2 users are required to form a group chat"
        });
    }

    // users.push(req.payload);
    users.push(req.payload.id);
    console.log(users);


    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.payload.id,
        });

        // const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
        //     .populate("users", "-password")
        //     .populate("groupAdmin", "-password");

        res.status(200).json({
            status:'success',
            message:'Successfully created',
            data:groupChat
        });
    } catch (error) {
        res.json({
            status: 'err',
            message: 'something went wrong',
            error: error
        })
    }
})



module.exports = router;