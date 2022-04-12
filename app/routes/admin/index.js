const express = require('express')
const router = express.Router()

const productRouter = require('./product/index.js')
const profileRouter = require('./profile/index.js');
const paymentRouter = require('./payment/index.js');
const dashboardController = require('../../controllers/admin/dashboard.js')
const contactusRouter = require('./contactus/index.js')

router.get('/dashboard', dashboardController.index)
router.use('/product', productRouter)
router.use('/profile', profileRouter);
router.use('/payment', paymentRouter);
router.use('/messages', contactusRouter)

module.exports = router