const router = require('express').Router();
const User = require('../../models/User');
const SmsService = require('../../services/sms-service');
const OtpService = require('../../services/otp-service');

const Otp = new OtpService();
const sms = new SmsService();

router.post('/send-otp', async (req, res) => {
    const { phone, email } = req.body;
    try {
        const user = await User.findOne({ $or: [{ phone: phone }, { email: email }] });

        if (!user) {
            res.status(404).json({
                status: 'err',
                message: 'User Not Found !'
            });
        } else {
            const { otp } = await Otp.getOtp(phone, email);
            await sms.sendOtp(phone, otp);
            console.log('session otp', otp);
            res.status(201).send({
                status: 'success',
                msg: 'Otp sent successfully'
            })
        };
    } catch (error) {
        res.status(500).json({
            status: 'err',
            message: 'Something went wrong'
        })
    }
})

module.exports = router;