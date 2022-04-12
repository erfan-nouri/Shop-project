const express = require('express');
const router = express.Router();
const paymentController = require('../../../controllers/admin/payment/index.js');



router.get('/list', paymentController.paymentList);
router.get('/delete?', paymentController.delete)


module.exports = router