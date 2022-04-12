const express = require('express')
const router = express.Router();
const contactusRouter = require('./contactus.js')


router.use('/', contactusRouter)




module.exports = router