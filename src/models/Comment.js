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
        default: []
    },
    parentCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: false
    },
    repliedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    isReply: {
        type: Boolean,
        default: false
    }
    // replies: {
    //     type: [{
    //         repliedUserId: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: 'User',
    //         },
    //         replyText: {
    //             type: String,
    //             required: true
    //         },
    //         time: {
    //             type: Date,
    //             default: Date.now()
    //         }
    //     }],
    //     default: []
    // }
}, { timestamps: true });

const Comment = new mongoose.model("Comment", commentSchema);

module.exports = Comment;