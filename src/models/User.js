const mongoose = require('mongoose');

const useSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    profilePic: {
        type: String,
        default: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
    },
    followers: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        default: [],
    },
    followings: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        default: [],
    },
    city: {
        type: String
    },
    schoolCollege: {
        type: String
    },
    insta: {
        type: String
    },
    bio: {
        type: String
    },
    fromGoogle: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
);

const User = new mongoose.model('User', useSchema);

module.exports = User;