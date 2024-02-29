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
  upsertUserPreferredFood(preferData) {
    return Prefer.upsert(preferData, {
      where: {
        userId: preferData.userId,
        foodId: preferData.foodId,
      },
    });
  },
  incrementView(userId, foodId) {
    return Prefer.increment(
      { view: 1 },
      {
        where: {
          userId,
          foodId,
        },
      },
    );
  },
  createPrefer(data) {
    return Prefer.create(data);
  },
};

module.exports = preferService;
