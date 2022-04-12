const express = require('express')
const router = express.Router()
const authController = require ('../../controllers/auth/index.js');

router.get('/',authController.showLogin)
router.post('/',authController.doLogin)




module.exports = router