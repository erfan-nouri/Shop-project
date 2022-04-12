const express = require('express');
const router = express.Router();
const singleRouter = require('./single.js')


router.use('/', singleRouter);



module.exports = router