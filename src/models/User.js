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
        default: 'https://scontent.fdel27-2.fna.fbcdn.net/v/t1.6435-1/56649304_774018922980197_3401248377671778304_n.jpg?stp=c0.27.160.160a_dst-jpg_p160x160&_nc_cat=105&ccb=1-7&_nc_sid=7206a8&_nc_ohc=hSrD857MHkcAX_79yzm&tn=Q1MlEuzwQVVwz2O1&_nc_ht=scontent.fdel27-2.fna&oh=00_AT-Vrokn1lzgz3MH8Fl76bugSkjcsdvCXsnCgUMyCH1ALA&oe=635A7839'
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
    fromGoogle: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
);

const User = new mongoose.model('User', useSchema);

module.exports = User;