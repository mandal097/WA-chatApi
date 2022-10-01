const router = require('express').Router();
const User = require('../../../models/User');


router.get('/get-profile/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById({ _id: id });
        if (!user) {
            res.status(200).json({
                status: 'err',
                message: 'User not found'
            });
        } else {
            res.status(200).json({
                status: 'success',
                data: user
            });
        };
    } catch (error) {
        res.status(500).json({
            status: 'err',
            message: 'Somethin went wrong'
        })
    }
})

module.exports = router;