const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    chatName: {
        type: String,
        trim: true,
    },
    isGroupChat: {
        type: Boolean,
        default: false,
    },
    info: {
        type: String,
        default: ''
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    groupAvatar: {
        type: String,
        default: 'https://images.unsplash.com/photo-1607748851687-ba9a10438621?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGdyb3Vwc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
    }
},
    { timestamps: true }
);


const Chat = new mongoose.model('Chat', chatSchema);

module.exports = Chat;