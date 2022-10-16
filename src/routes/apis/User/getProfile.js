const router = require('express').Router();
const User = require('../../../models/User');


router.get('/get-profile/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById({ _id: id });
        if (!user) {
            return res.json({
                status: 'err',
                message: 'User not found'
            });
        } else {
            return res.json({
                status: 'success',
                data: user
            });
        };
    } catch (error) {
        return res.json({
            status: 'err',
            message: 'Somethin went wrong'
        })
    }
})

module.exports = router;