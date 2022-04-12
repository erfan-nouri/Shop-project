const express = require('express')
const router = express.Router()
const manageController = require('../../../controllers/admin/product/index.js')


router.get('/manage', manageController.showAll);



module.exports = router