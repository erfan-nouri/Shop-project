const express = require('express');
const router = express.Router();
const productController = require('../../../controllers/admin/product/index.js')

router.get('/delete/?', productController.delete)


module.exports = router