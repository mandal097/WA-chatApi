const mongoose = require('mongoose');


const groupActivityLogSchema = new mongoose.Schema({
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: true,
    },
    adminId: { //who takes actions in group 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: { // title of the acitvity log
        type: String,
        required: true,
    },
    note: {// about the activity
        type: String,
    },
},
    { timestamps: true }
);

const GroupActivityLog = new mongoose.model('GroupActivityLog', groupActivityLogSchema);

module.exports = GroupActivityLog;