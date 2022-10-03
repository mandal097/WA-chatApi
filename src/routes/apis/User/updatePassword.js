const Otp = require('../../../models/Otp');
const User = require('../../../models/User');
const HashService = require('../../../services/hash-service');

const router = require('express').Router();

const hash = new HashService()

router.post('/forgot', async (req, res) => {
    const { password, otp, phone } = req.body;
    // checking the otp entered by the user is correct or not , we send OTP to user 
    if (!otp || !phone) {
        res.json({ message: "All fields are required" })
    }

    const getOtp = await Otp.find({ phone: phone });
    console.log(getOtp[getOtp.length - 1]);


    if (!getOtp) return res.json({ status: 'err', message: 'OTP no longer exists' });

    // check if OTP is  expired or not
    if (getOtp && getOtp[getOtp.length - 1].expiresIn < Date.now()) {
        return res.json({ status: 'err', message: 'OTP is expired' });
    }
    // check if otp is valid or not
    if (otp !== getOtp[getOtp.length - 1].otp) {
        return res.json({ status: 'err', message: 'Invalid OTP' });
    }

    // if otp is valid then update its password
    try {
        const hashPassword = hash.hashPassword(password);
        const updatePassword = await User.findOneAndUpdate({ phone: phone }, {
            $set: { password: hashPassword }
        },
            { new: true }
        );
        res.status(201).json({
            status: 'err',
            message: 'successfully updated',
            data: updatePassword
        });
    } catch (error) {
        res.status(500).json({
            status: 'err',
            message: 'Something went wrong',
            error: error
        })
    }
})

module.exports = router;





