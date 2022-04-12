const express = require('express');
const router = express.Router();
const buyRouter = require('./buy.js');

router.use('/buy', buyRouter);

module.exports = router;