const { Food } = require('../models');
const Prefer = require('../models/prefer');

const preferService = {
  async getPreferByPk(userId, foodId) {
    return Prefer.findByPk(userId, foodId);
  },
  async getFoodsByUserPrefer(userId, preferOptions) {
    // eslint-disable-next-line no-useless-catch
    const prefers = await Prefer.findAll({
      where: {
        userId,
        ...(preferOptions && {
          ...preferOptions,
        }),
      },
      include: [
        {
          model: Food,
        },
      ],
    });

    return prefers.map((prefer) => prefer.food);
  },
  async upsertUserPreferredFood(preferData) {
    return Prefer.upsert(preferData);
  },
};

module.exports = preferService;
