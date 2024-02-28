const express = require('express');
const router = express.Router();
const recommend = require('../controller/recommendController');

//TODO: 우선순위 뒤
router.get('/best', recommend.best);

module.exports = router;
