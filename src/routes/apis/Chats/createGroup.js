const router = require('express').Router();
const Chat = require('../../../models/Chat')
const User = require('../../../models/User')

router.post('/create-group', async (req, res) => {
    const { users, name, groupAvatar } = req.body;
    if (!users || !name) {
        return res.status(400).send({
            status: 'err',
            message: "Please Fill all the feilds"
        });
    }


    if (users.length < 2) {
        return res.status(400).send({
            status: 'err',
            message: "More than 2 users are required to form a group chat"
        });
    }

    users.push(req.payload.id);


    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAvatar:groupAvatar,
            groupAdmin: req.payload.id,
        });


        res.status(200).json({
            status: 'success',
            message: 'Successfully created',
            data: groupChat
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