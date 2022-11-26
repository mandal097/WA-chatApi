const router = require('express').Router();

const testRoute = require('./test');
const createProduct = require('./createProduct');

router.use('/test', testRoute);
router.use('/create-product', createProduct);


module.exports = router;