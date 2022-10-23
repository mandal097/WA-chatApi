const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    commentText: {
        type: String,
        required: true,
    },
    likes: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        default:[]
    },
    replies: {
        type: [{
            repliedUserId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            replyText: {
                type: String,
                required: true
            }
        }],
        default: []
    }
});

const Comment = new mongoose.model("Comment", commentSchema);

module.exports = Comment;