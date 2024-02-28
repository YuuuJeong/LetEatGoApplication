const { ShoppingList, Material, MaterialCategory } = require('../models');
const { Op } = require('sequelize');

const shoppingListService = {
  async getMyShoppingLists(userId, paginateOptions) {
    const { page, size } = paginateOptions;
    const offset = (page - 1) * size;
    const [nodes, count] = await Promise.all([
      ShoppingList.findAll({
        where: {
          userId,
          deletedAt: null,
        },
        include: {
          model: Material,
          include: {
            model: MaterialCategory,
          },
        },
        offset,
        limit: +size,
      }),
      ShoppingList.count({
        where: {
          userId,
          deletedAt: null,
        },
      }),
    ]);

    return {
      nodes,
      count,
    };
  },
};

module.exports = shoppingListService;
