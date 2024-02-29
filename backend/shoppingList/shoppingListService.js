const { ShoppingList, Material, MaterialCategory } = require('../models');
const { Op } = require('sequelize');

const shoppingListService = {
  async getMyShoppingLists(userId, paginateOptions) {
    const { page, size } = paginateOptions;
    const offset = (page - 1) * size;
    const { rows, count } = await ShoppingList.findAndCountAll({
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
    });

    return {
      nodes: rows,
      count,
    };
  },
  addShoppingLists(shoppingLists) {
    return ShoppingList.bulkCreate(shoppingLists);
  },
  deleteShoppingList(id) {
    return ShoppingList.destroy({
      where: {
        id,
      },
    });
  },
};

module.exports = shoppingListService;
