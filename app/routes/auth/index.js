const express = require('express')
const router = express.Router();

const loginRouter = require('./login.js')
const registerRouter = require('./register.js')
const passwordRouter = require('./password');





router.use('/login', loginRouter)
router.use('/register', registerRouter)
router.use('/', passwordRouter)








module.exports = router