const router = require('express').Router();
const auth = require('../../../middleware/auth');
const adminRoutes = require('./Admin/_router');

const getProduct = require('./getProduct.js');
const getAllProduct = require('./getAllProducts');

router.use('/market-place/', auth, adminRoutes); //routes for admins who can create/delete/update products

router.use('/market-place/all-products', getAllProduct) //get all products 
router.use('/market-place/product', auth, getProduct) //get product by its product Id

module.exports = router;