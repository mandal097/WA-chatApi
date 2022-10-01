const Otp = require('../models/Otp');
const HashService = require('./hash-service');

class OtpService {
    generateOtp() {
        const otp = Math.ceil(1000 + Math.random() * 9000);
        return otp;
    }

    async getOtp(phone, email) {
        try {
            // creating new otp document to this phone
            const otpNumber = this.generateOtp();  //generate otp number
            // const hashOtpNumber = hash.hashOtp(otpNumber);  //hashing otp 
            // console.log(hashOtpNumber)
            // console.log(hashOtpNumber);
            const expires = Date.now() + 60 * 1000 * 10;
            const newOtp = new Otp({
                email,
                phone,
                otp: otpNumber,
                expiresIn: expires
            });
            const savedOtp = await newOtp.save(); //saving otp

            setTimeout(async () => {
                await Otp.deleteMany({ $or: [{ phone: phone }, { email: email }] })
            }, 600000);
            return savedOtp;
        } catch (error) {
            return error;
        }
    }
};

module.exports = OtpService;