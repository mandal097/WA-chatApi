const Otp = require('../models/Otp');
const HashService = require('./hash-service');

// const hash  = new HashService()
class OtpService {
    generateOtp() {
        const otp = Math.ceil(1000 + Math.random() * 9000);
        return otp;
    }

    async getOtp(field, emailPhone) {
        try {
            // creating new otp document to this phone
            const otpNumber = this.generateOtp();  //generate otp number
            // const hashOtpNumber = this.hash.hashOtp(otpNumber);  //hashing otp 
            // console.log(hashOtpNumber)
            // console.log(hashOtpNumber);
            const expires = Date.now() + 60 * 1000 * 2;

            if (field === "phone") {
                const newOtp = new Otp({
                    otp: otpNumber,
                    expiresIn: expires,
                    phone:emailPhone
                });
                const savedOtp = await newOtp.save(); //saving otp
                return savedOtp;
            }
            if (field === 'email') {
                const newOtp = new Otp({
                    otp: otpNumber,
                    expiresIn: expires,
                    email:emailPhone
                });
                const savedOtp = await newOtp.save(); //saving otp
                return savedOtp;
            };
        } catch (error) {
            return error;
        }
    }
};

module.exports = OtpService;