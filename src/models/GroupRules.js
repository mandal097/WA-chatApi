const mongoose = require('mongoose');


const groupSchema = new mongoose.Schema({
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: true,
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {  //title of the rule
        type: String,
        required: true,
    },
    desc: {    //description for the rule
        type: String,
        required: true
    },
},
    { timestamps: true }
);

const GroupRules = new mongoose.model('GroupRules', groupSchema);

module.exports = GroupRules;