const express = require('express');
const router = express.Router();
const productController = require('../../../controllers/front/product/index.js')

router.get('/:productId/:productSlug',productController.single)



module.exports = router