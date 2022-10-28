const router = require('express').Router();
const User = require('../../../models/User');
const HashService = require('../../../services/hash-service');

const hash = new HashService()

router.put('/', async (req, res) => {
    const { id } = req.payload;
    let { password } = req.body;
    if (password) {
        const hashPassword = hash.hashPassword(password);
        password = hashPassword
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: req.body,
        },
            { new: true }
        )
        const { password, ...others } = updatedUser._doc;
        res.status(201).json({
            status: 'success',
            message: 'Updated successfully',
            data: others
        })
    } catch (error) {
        res.status(500).json({
            status: 'err',
            message: 'Something went wrong'
        })
    }
})

module.exports = router;