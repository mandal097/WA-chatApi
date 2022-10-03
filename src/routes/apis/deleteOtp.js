const Otp = require('../../models/Otp');

const router = require('express').Router();

router.delete('/delete-otp/:phone', async (req, res) => {
    const { phone } = req.body;
    try {
        await Otp.deleteMany({ phone: phone });
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

router.delete('/delete-otp/:email', async (req, res) => {
    const { email } = req.body;
    try {
        await Otp.deleteMany({ email: email });
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