const express = require('express')
const router = express.Router();

const authController = require ('../../controllers/auth/index.js');




router.get('/',authController.showRegister)
router.post('/',authController.doRegister)


module.exports = router