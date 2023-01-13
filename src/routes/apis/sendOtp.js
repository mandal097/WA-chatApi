const router = require('express').Router();
const User = require('../../models/User');
const SmsService = require('../../services/sms-service');
const MailService = require('../../services/email-service');
const OtpService = require('../../services/otp-service');

const Otp = new OtpService();
const sms = new SmsService();
const mail = new MailService();

router.post('/send-otp', async (req, res) => {
    const { phone, email } = req.body;
    let data;

    if (email && phone === undefined) {
        data = { email: email }
    } else if (phone && email === undefined) {
        data = { phone: phone }
    } else {
        return res.json({
            status: 'err',
            message: 'Please give credentials'
        })
    }

    const user = await User.findOne(data)

    if (!user) {
        return res.json({
            status: 'err',
            message: 'User Not Found !'
        });
    }

    try {

        if (email && phone === undefined) {
            const { otp } = await Otp.getOtp('email', email);
            console.log('session otp', otp);
            mail.sendEmail(email ? email : user.email, user.name, otp)
        } else if (phone && email === undefined) {
            const { otp } = await Otp.getOtp('phone', phone);
            console.log('session otp', otp);
            await sms.sendOtp(phone, otp);
        } else {
            return res.json({
                status: 'err',
                message: 'Please give credentials'
            })
        }


        // await sms.sendOtp(phone, otp);
        return res.status(201).send({
            status: 'success',
            message: 'Otp sent successfully'
        })
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            message: 'Something went wrong'
        })
    }

})

module.exports = router;