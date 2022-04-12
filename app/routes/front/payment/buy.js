const express = require('express');
const router = express.Router();
const paymentController = require('../../../controllers/front/payment/index.js')


router.get('/', paymentController.buy)
router.get('/buycallback', paymentController.buycallback)


module.exports = router