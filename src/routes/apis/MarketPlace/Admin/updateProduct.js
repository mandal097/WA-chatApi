const router = require('express').Router();
const Product = require('../../../../models/Product');

// for groups
router.put('/:productId', async (req, res) => {
    const { productId } = req.params;
    const userId = req.payload.id
    const product = await Product.findById(productId);
    // console.log(req.body);
    // console.log(productId);

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
            message: 'Only owner can update this product'
        });

    } else {
        // await product.updateOne({
        //     $set: req.body
        // }, { new: true });
        await Product.findByIdAndUpdate(productId, {
            $set: req.body
        }, { new: true })

        return res.json({
            status: 'success',
            message: 'Successfully updated product'
        })

    }
});


module.exports = router;