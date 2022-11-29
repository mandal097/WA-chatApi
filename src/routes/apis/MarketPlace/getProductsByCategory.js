const router = require('express').Router();
const Product = require('../../../models/Product');


router.get('/:category', async (req, res) => {
    const { category } = req.params;
    console.log(category);
    try {
        const product = await Product.find({ category: category });
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