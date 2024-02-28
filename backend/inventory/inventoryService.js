const { Inventory, Material, MaterialCategory } = require('../models');

const inventoryService = {
  async getMyInventories(userId, paginateOptions) {
    const { page, size } = paginateOptions;
    const offset = (page - 1) * size;
    const where = {
      userId,
      deletedAt: null,
    };

    const [nodes, count] = await Promise.all([
      Inventory.findAll({
        where,
        include: {
          model: Material,
          include: {
            model: MaterialCategory,
          },
        },
        offset,
        limit: +size,
      }),
      Inventory.count({
        where: {
          userId,
          deletedAt: null,
        },
      }),
    ]);
    Inventory.findAll({
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
      nodes,
      count,
    };
  },
};

module.exports = inventoryService;
