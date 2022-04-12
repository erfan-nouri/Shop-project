const express = require('express')
const router = express.Router();
const dashboardController = require('../../../controllers/front/dashboard/index.js')
const dashboardAuthMiddleware = require('../../../middlewares/front/dashboard/index.js')

router.get('/',[dashboardAuthMiddleware.auth], dashboardController.index)
router.get('/payment',dashboardController.payment)

module.exports = router