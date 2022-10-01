const Otp = require('../../../models/Otp');
const User = require('../../../models/User');
const HashService = require('../../../services/hash-service');

const router = require('express').Router();

const hash = new HashService()

router.patch('/forgot', async (req, res) => {
    const { password, otp, email, phone } = req.body;
    // checking the otp entered by the user is correct or not , we send OTP to user 
    if (!otp) return res.status(404).json({ status: 'err', message: 'Please Give OTP' })

    const getOtp = await Otp.find({ $or: [{ phone: phone }, { email: email }] });
    console.log(getOtp);

    if (!getOtp) return res.status(500).json({ status: 'err', message: 'OTP no longer exists' });

    // check if OTP is  expired or not
    if (Date.now() > getOtp.expiresIn) return res.status(400).json({ status: 'err', message: 'OTP is expired' });

    // check if otp is valid or not
    if (!otp === getOtp.otp) {
       return res.status(400).json({ status: 'err', message: 'Invalid OTP' });
    } else {
        try {
            // if otp is valid then update its password
            const hashPassword = hash.hashPassword(password);
            const updatePassword = await User.findOneAndUpdate({ $or: [{ phone: phone }, { email: email }] }, {
                $set: { password: hashPassword }
            },
                { new: true }
            )
            res.status(201).json({
                status: 'err',
                message: 'successfully updated',
                data: updatePassword
            })
        } catch (error) {   
            res.status(500).json({
                status: 'err',
                message: 'Something went wrong'
            })
        }
    }
})

module.exports = router;