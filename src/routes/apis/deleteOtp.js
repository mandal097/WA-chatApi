const Otp = require('../../models/Otp');

const router = require('express').Router();

router.post('/delete-otp', async (req, res) => {
    const { phone, email } = req.body;
    try {
        if (email) {
            await Otp.deleteMany({ email: email });
        }
        if (phone) {
            await Otp.deleteMany({ phone:phone })
        }
        res.status(201).json({
            status: 'success',
            message: 'deleted from database',
        })

    } catch (error) {
        res.status(500).json({
            status: 'err',
            message: 'something went wrong',
            error
        })
    }
})

module.exports = router;