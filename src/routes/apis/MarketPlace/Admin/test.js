const router = require('express').Router();

router.get('', (req, res) => {
    res.json({
        status: 'success',
        message: 'test route for the market place'
    })
})

module.exports = router;