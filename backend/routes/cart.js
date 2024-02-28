const express = require('express');
const router = express.Router();
const cart = require('../controller/cartController');

router.post('/', cart.add);
router.delete('/', cart.delete);

module.exports = router;
