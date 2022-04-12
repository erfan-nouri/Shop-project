const express = require('express');
const router = express.Router();

const paymentController = require('../../../controllers/admin/payment/index.js');


router.post('/deposit', paymentController.deposit)
router.get('/depositcallback', paymentController.depositCallBack)


module.exports = router