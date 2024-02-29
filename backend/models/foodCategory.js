const Sequelize = require('sequelize');
const FoodCategoryMapping = require('./foodCategoryMapping');
module.exports = class FoodCategory extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        paranoid: false,
        modelName: 'foodCategory',
        tableName: 'FoodCategory',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(models) {
    this.belongsToMany(models.Food, {
      through: FoodCategoryMapping,
      foreignKey: 'categoryId',
    });
  }
};
