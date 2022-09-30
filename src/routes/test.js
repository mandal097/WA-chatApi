const router = require('express').Router();

router.get('', (req, res) => {
    res.status(201).json({
        status: 1,
        message: 'testing routes'
    })
})

module.exports = router;