const express = require('express')
const router = express.Router();
const passwordController = require('../../controllers/auth/password.js')



router.get('/forget-password', passwordController.showForgetPassword)
router.post('/forget-password', passwordController.forgetPassword)

router.get('/reset-password/:token', passwordController.showResetPassword)
router.post('/reset-password/:id', passwordController.resetPassword)


module.exports = router