const Food = require('../models/food');
const { Op, Sequelize } = require('sequelize');

const foodService = {
  getFoodById(foodId) {
    return Food.findByPk({
      where: {
        foodId,
      },
    });
  },
  getFoodByIds(foodIds) {
    return Food.findAll({
      attributes: ['name', 'image', 'foodId'],
      where: {
        foodId: { [Op.in]: foodIds },
      },
    });
  },
  getRandomFoods(size) {
    return Food.findAll({
      order: [Sequelize.fn('RAND')],
      limit: size,
    });
  },
  async getFoods(keyword, size, page) {
    const conditions = keyword.map((value) => ({
      name: {
        [Op.like]: `%${value}%`,
      },
    }));

    return await Food.findAndCountAll({
      where: {
        [Op.or]: conditions,
      },
      offset: (page - 1) * size,
      limit: +size,
    });
  },
};

module.exports = foodService;
