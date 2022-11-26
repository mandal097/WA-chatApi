const router = require('express').Router();
const Product = require('../../../models/Product');


router.get('/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById({ _id: productId }).populate('sellerId', 'name')
        if (!product) {
            return res.json({
                status: 'err',
                message: 'product not found'
            });
        } else {
            return res.json({
                status: 'success',
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