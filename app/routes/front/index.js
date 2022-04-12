const express = require('express');
const router = express.Router();

const shopCartRouter = require('./shopCart.js');
const productRouter = require('./product/index.js')
const paymentrouter = require('./payment/index.js');
const dashboardRouter = require('./dashboard/index.js')
const frontController = require('../../controllers/front/index.js')
const pagesRouter = require('./pages/index.js');


router.get('/', frontController.index);
router.use('/product', productRouter)
router.use('/shopcart', shopCartRouter);
router.use('/payment', paymentrouter);
router.use('/dashboard', dashboardRouter);
router.use('/', pagesRouter)


module.exports = router