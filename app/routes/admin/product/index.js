const express = require('express')
const router = express.Router();
const addProduct = require('./add.js')
const editProduct = require('./edit.js')
const manageProduct = require('./manage.js');
const deleteProduct = require('./delete.js');
const categoryRouter = require('./category/index');


router.use('/', addProduct)
router.use('/', editProduct)
router.use('/', manageProduct)
router.use('/', deleteProduct);
router.use('/', categoryRouter)




module.exports = router