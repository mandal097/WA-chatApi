const smsSID = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;

const twilio = require('twilio')(smsSID, smsAuthToken, {
    lazyLoading: true
});

class SmsService {
    async sendOtp(phone, otp) {
        try {
            return await twilio.messages.create({
                to: phone,
                from: process.env.SMS_NUMBER,
                body: `Your WeChat OTP is ${otp}`
            })
        } catch (error) {
            return error
        }
    }
};

module.exports = SmsService;