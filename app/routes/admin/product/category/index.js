const express = require('express');
const router = express.Router();
const categoryController = require('../../../../controllers/admin/product/category.js');


router.get('/category', categoryController.showCategory)
router.get('/category/edit?', categoryController.edit)
router.post('/category/edit',categoryController.update)




module.exports = router