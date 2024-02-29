const { Inventory, Material, MaterialCategory } = require('../models');

const inventoryService = {
  async getMyInventories(userId, paginateOptions) {
    const { page, size } = paginateOptions;
    const offset = (page - 1) * size;
    const where = {
      userId,
      deletedAt: null,
    };

    const { rows, count } = await Inventory.findAndCountAll({
      where,
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

  addInventories(inventories) {
    return Inventory.bulkCreate(inventories);
  },
  deleteInventory(id) {
    return Inventory.destroy({
      where: {
        id,
      },
    });
  },
};

module.exports = inventoryService;
