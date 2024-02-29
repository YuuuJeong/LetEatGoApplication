const { Op } = require('sequelize');
const { Material } = require('../models');

const materialService = {
  countMaterialsByIds(ids) {
    return Material.count({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
  },
};

module.exports = materialService;
