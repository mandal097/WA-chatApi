const router = require('express').Router();
const User = require('../../../../models/User');
const HashService = require('../../../../services/hash-service');
const OtpService = require('../../../../services/otp-service');
const TokenService = require('../../../../services/token-service');


const hash = new HashService();
const token = new TokenService();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(404).json({
            status: 'err',
            message: 'All fields are required'
        })
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.json({
                status: 'err',
                message: 'User not found '
            })
        } else {
            const isValid = hash.verifyPassword(req.body.password, user.password);
            if (!isValid) {
                res.json({
                    status: 'err',
                    message: 'Wrong credentials'
                });
            } else {
                const access_token = token.generateToken({ id: user.id, email })
                const { password, ...others } = user._doc;
                res.status(201).json({
                    status: 'success',
                    message: 'Logged in successfully',
                    token: access_token,
                    data: others
                })
            }
        };
    } catch (error) {
        res.status(500).json({
            status: 'err',
            message: 'Something went wrong',
            error: error
        })
    }
})

module.exports = router;
