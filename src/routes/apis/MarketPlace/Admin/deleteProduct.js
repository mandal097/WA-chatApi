const router = require('express').Router();
const Product = require('../../../../models/Product');

// for groups
router.delete('/:productId', async (req, res) => {
    const { productId } = req.params;
    const userId = req.payload.id
    const product = await Product.findById(productId);

    if (!product) {
        return res.json({
            status: 'err',
            message: 'Product not found'
        })
    }
    const checkIsAdmin = product.sellerId._id == userId

    if (!checkIsAdmin) {
        return res.json({
            status: 'err',
            message: 'Only owner can delete this product'
        });

    } else {
        await Product.findByIdAndDelete(productId);
        return res.json({
            status: 'success',
            message: 'Successfully deleted product'
        })

    }
});


module.exports = router;