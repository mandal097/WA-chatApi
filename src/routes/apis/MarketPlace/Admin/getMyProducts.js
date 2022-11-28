const router = require('express').Router();
const Product = require('../../../../models/Product');


router.get('/:profileId', async (req, res) => {
    const { profileId } = req.params;
    try {
        const product = await Product.find({ sellerId: profileId });
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