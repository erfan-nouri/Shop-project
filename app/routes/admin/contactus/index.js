const express = require('express')
const router = express.Router();

const contactusController = require('../../../controllers/admin/contactus/index.js')


router.get('/', contactusController.index)
router.get('/seen/:messageid', contactusController.seen)
router.get('/unseen/:messageid', contactusController.unSeen)



module.exports = router 