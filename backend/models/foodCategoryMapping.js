const Sequelize = require('sequelize');
module.exports = class FoodCategoryMapping extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        foodId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        categoryId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        paranoid: false,
        modelName: 'foodCategoryMapping',
        tableName: 'Food_FoodCategory',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }
};
