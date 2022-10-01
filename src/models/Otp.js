const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    otp: {
        type: Number
    },
    expiresIn: {
        type: Number
    }
},
    { timestamps: true }
);


const Otp = new mongoose.model("Otp", otpSchema);

module.exports = Otp;