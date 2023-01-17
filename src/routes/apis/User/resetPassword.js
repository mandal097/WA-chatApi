const router = require('express').Router();
const User = require('../../../models/User');
const HashService = require('../../../services/hash-service');

const hash = new HashService()

router.put('', async (req, res) => {
    const { id } = req.payload;
    const { password, oldPassword } = req.body;

    console.log(password);
    console.log(oldPassword);

    const user = await User.findOne({ _id: id })

    const isValidOldPasword = hash.verifyPassword(req.body.oldPassword, user.password); //verifying old password

    if (!isValidOldPasword) {
        return res.json({
            status: 'err',
            message: 'Old password wrong',
        })
    }

    try {
        const hashPassword = hash.hashPassword(password);
        await User.findByIdAndUpdate(id, {
            $set: { password: hashPassword }
        },
            { new: true }
        );
        res.status(201).json({
            status: 'success',
            message: 'Successfully updated'
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