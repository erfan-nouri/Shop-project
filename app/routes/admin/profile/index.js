const express = require('express')
const router = express.Router();

const profileController = require('../../../controllers/admin/profile/index.js');



router.get('/', profileController.index);


module.exports = router