const express = require('express');
const router = express.Router();
const shopcartController = require('../../controllers/front/shopCart.js')


router.get('/', shopcartController.index)
router.post('/', shopcartController.store)
router.get('/delete/?', shopcartController.delete)





module.exports = router