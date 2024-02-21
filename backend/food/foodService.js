const Food = require('../models/food');
const { Op } = require('sequelize');

const foodService = {
  getFoodByIds(foodIds) {
    return Food.findAll({
      attributes: ['name', 'image', 'foodId'],
      where: {
        foodid: { [Op.in]: foodIds },
      },
    });
  },
};

module.exports = foodService;
