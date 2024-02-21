const express = require('express');
const preferController = require('./perferController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const router = express.Router();

router.post('', isAuthenticated, preferController.upsertPrefer);

module.exports = router;
