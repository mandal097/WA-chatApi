const router = require('express').Router();
const User = require('../../../models/User');
const HashService = require('../../../services/hash-service');

const hash = new HashService()

router.put('/', async (req, res) => {
    const { id } = req.payload;
    let { phone } = req.body;
    const phoneExist = await User.findOne({ phone: phone });

    if (phoneExist) {
        return res.json({
            status: 'err',
            message: 'Phone number already exists'
        })
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: req.body,
        },
            { new: true }
        )
        const { password, ...others } = updatedUser._doc;
        return res.status(201).json({
            status: 'success',
            message: 'Updated successfully',
            data: others
        })
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            message: 'Something went wrong ='
        })
    }
})

module.exports = router;