const router = require('express').Router();

const testRoute = require('./test');
const createProduct = require('./createProduct');
const getMyProducts = require('./getMyProducts');
const deleteProduct = require('./deleteProduct');
const updateProduct = require('./updateProduct');

router.use('/test', testRoute);  //test
router.use('/create-product', createProduct); //creating product
router.use('/get-my-products', getMyProducts); //get all listed products of a single user bu its id
router.use('/delete-product', deleteProduct); //delete product
router.use('/update-product', updateProduct); //update product


module.exports = router;