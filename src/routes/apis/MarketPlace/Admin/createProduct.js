const Product = require('../../../../models/Product');

const router = require('express').Router();

router.post('', async (req, res) => {
    const sellerId = req.payload.id;
    const {
        photo,
        productName,
        price,
        condition,
        category,
        tags,
        location,
        desc,
        status
    } = req.body;

    // if (!photo || !productName || price || !condition || !category || !tags || !location || !desc) {
    //     return res.json({
    //         status: 'err',
    //         message: 'All fields are required-1'
    //     })
    // }
    const data = {
        sellerId,
        photo,
        productName,
        price,
        condition,
        category,
        tags,
        location,
        desc,
        status
    }
    try {
        const newProduct = new Product(data);
        console.log(newProduct);
        const savedProduct = await newProduct.save()
        return res.json({
            status: 'success',
            message: 'Product created successfully',
            data: savedProduct
        })
    } catch (error) {
        return res.json({
            status: 'success',
            message: 'Product created successfully',
            data: error
        })

    }
});


module.exports = router;