const express = require('express');
const router = express.Router();

const depositRouter = require('./deposit.js')
const paymentListRouter = require('./list.js')



router.use('/', depositRouter)
router.use('/', paymentListRouter)

module.exports = router