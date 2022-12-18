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
    coverImg: {
        type: String,
        default: "https://scontent.fdel27-4.fna.fbcdn.net/v/t1.6435-9/100527609_1077588095956610_3980996785706369024_n.jpg?stp=dst-jpg_p180x540&_nc_cat=102&ccb=1-7&_nc_sid=e3f864&_nc_ohc=jgl8Y1QaPm0AX8WGkmY&_nc_ht=scontent.fdel27-4.fna&oh=00_AT-NiNCq2VXbKrf1BpcUUvqR3-1X3SDULsBEMNZzN92dcw&oe=636E3982"
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
    },
    groupInvites: [{   //contains id's of the group's 
        role: {
            type: String,
            default: 'member_request'
            // default: 'admin_request'
        },
        groupId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group',
        },
        invitedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    }],
},
    { timestamps: true }
);

const User = new mongoose.model('User', useSchema);

module.exports = User;