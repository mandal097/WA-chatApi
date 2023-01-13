const smsSID = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;

const twilio = require('twilio')(smsSID, smsAuthToken)
//     , {
//     lazyLoading: true
// });

class SmsService {
    async sendOtp(phone, otp) {
        console.log('hi ther');
        try {
            return await twilio.messages.create({
                body: `Your WeChat OTP is ${otp}`,
                // messagingServiceSid: 'MG36f24d785a3f2f7dbae7ebc9a7543346',
                to: +91 + phone,
                from: process.env.SMS_NUMBER,
            })
        } catch (error) {
            return error
        }
    }
};

module.exports = SmsService;