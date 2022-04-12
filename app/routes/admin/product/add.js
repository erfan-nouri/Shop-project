const express = require('express')
const router = express.Router();
const productController = require('../../../controllers/admin/product/index.js')

router.get('/add', productController.add);
router.post('/add', productController.store);

module.exports = router