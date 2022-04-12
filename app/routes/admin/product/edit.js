const express = require('express')
const router = express.Router();
const productController = require('../../../controllers/admin/product/index.js')

router.get('/edit/?', productController.edit);
router.post('/edit',productController.updateProduct)

module.exports = router