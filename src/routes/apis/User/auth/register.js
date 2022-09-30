const router = require('express').Router();
const User = require('../../../../models/User');
const HashService = require('../../../../services/hash-service');
const TokenService = require('../../../../services/token-service');

const hash = new HashService();
const token = new TokenService();


router.post('/registration', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(404).json({
            status: 'err',
            message: 'All fields are required'
        })
    }
    try {
        const user = await User.findOne({ email });
        if (user) {
            res.status(401).json({
                status: 'err',
                message: 'User already exists'
            })
        } else {
            const newUser = new User({
                name,
                email,
                password: hash.hashPassword(password)
            })
            const savedUser = await newUser.save();
            const access_token = token.generateToken({ _id: savedUser._id, email})
            res.status(201).json({
                status: 'success',
                message: 'Registered successfully',
                token:access_token,
                data: savedUser
            })
        }

    } catch (error) {
        res.status(500).json({
            status: 'err',
            message: 'Something went wrong',
            error: error
        })
    }
})

module.exports = router;
