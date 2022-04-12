const express = require('express')
const router = express.Router();
const contactusController = require('../../../controllers/front/pages/contactus.js')


router.get('/contactus', contactusController.index)
router.post('/contactus',contactusController.submit)




module.exports = router