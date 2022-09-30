const User = require('../../../../models/User');
const TokenService = require('../../../../services/token-service');

const token = new TokenService();

const router = require('express').Router();

router.post('', async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            const newUser = new User({
                ...req.body,
                fromGoogle: true
            })
            const savedUser = await newUser.save()

            const access_token = token.generateToken({ id: savedUser._id, email: email });

            res.status(201).json({
                status: 'success',
                msg: 'Logged in Successfully',
                token: access_token,
                user: savedUser._doc
            })
        } else {
            const access_token = token.generateToken({ id: user._id, email: email });
            res.status(201).json({
                status: 'success',
                msg: 'Successfully Logged In',
                token: access_token,
                user: user._doc
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 'err',
            message: 'Something went wrong'
        })
    }
})

module.exports = router;