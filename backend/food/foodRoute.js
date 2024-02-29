const express = require('express');
const foodController = require('./foodController');
const {
  sizeValidator,
  keywordValidator,
} = require('./validator/foodValidator');
const { idValidator } = require('../common/validator/idValidator');
const router = express.Router();

router.get('random-foods', sizeValidator, foodController.getRandomFoods);
router.get('foods', keywordValidator, foodController.getFoods);
router.get('top5-foods', foodController.getTop5Foods);
router.get('foods/:id', idValidator, foodController.getFoodRecipes);
module.exports = router;
