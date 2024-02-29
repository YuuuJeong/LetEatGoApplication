const express = require('express');
const foodController = require('./foodController');
const {
  sizeValidator,
  keywordValidator,
} = require('./validator/foodValidator');
const router = express.Router();

router.get('random-foods', sizeValidator, foodController.getRandomFoods);
router.get('foods', keywordValidator, foodController.getFoods);
// router.get('foods/:id');
// router.get('top5-foods');
module.exports = router;
