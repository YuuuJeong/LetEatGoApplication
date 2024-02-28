const { ShoppingList } = require('../models');
const { Op } = require('sequelize');

const shoppingListService = {
  getMyShoppingLists(userId) {
    return ShoppingList.findAll({
      where: {
        userId,
      },
    });
  },
};

module.exports = foodService;
