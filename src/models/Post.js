const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    mediaUrl: {
        type: String,
        required: true,
    },
    text: {
        type: String,
    },
    mediaType: {
        type: String,
        default: 'image'
    },
    tags: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        default: []
    },
    likes: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        default: []
    },
    saved: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        default: []
    },
    isGroupPost: {
        type: Boolean,
        default: false
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Group'
    },
}, { timestamps: true });

const Post = new mongoose.model("Post", postSchema);

module.exports = Post;