const express = require('express');
const preferController = require('./perferController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const { upsertPreferValidator } = require('./validator/preferValidator');
const router = express.Router();

router.post(
  '',
  isAuthenticated,
  upsertPreferValidator,
  preferController.upsertPrefer,
);

module.exports = router;
