const express = require('express');
const router = express.Router();
const { idValidator } = require('../common/validator/idValidator');
const recipeController = require('./recipeController');

router.get('/:id/details', idValidator, recipeController.getRecipeDetails);

module.exports = router;
