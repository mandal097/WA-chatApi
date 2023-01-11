const mongoose = require('mongoose');


const groupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true,
    },
    groupCoverImg: {
        type: String,
        default: 'https://img.freepik.com/free-vector/group-chat-concept-illustration_114360-3429.jpg?size=626&ext=jpg&ga=GA1.2.2008843824.1668494017&semt=aitest'
    },
    admins: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        default: [],
    },
    adminsInvited: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        default: [],
    },
    members: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        default: [],
    },
    membersRequests: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        default: [],
    },
    membersInvited: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        default: [],
    },
    visibility: {
        type: String,
        default: 'visible'
    },
    isPrivate: {
        type: String,
        default: 'public'
    },
    desc: {
        type: String
    },
    location: {
        type: Object
    },
    pendingPost: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }],
        default:[]
    }
},
    { timestamps: true }
);

const Group = new mongoose.model('Group', groupSchema);

module.exports = Group;