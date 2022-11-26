const router = require('express').Router();
const Product = require('../../../models/Product');


router.get('', async (req, res) => {
    try {
        const product = await Product.find();
        if (!product) {
            return res.json({
                status: 'err',
                message: 'Product not found'
            });
        } else {
            return res.json({
                status: 'success',
                message: 'Product found successfully',
                data: product
            });
        };
    } catch (error) {
        return res.json({
            status: 'err',
            message: 'Something went wrong'
        })
    }
})

module.exports = router;