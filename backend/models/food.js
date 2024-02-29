const Sequelize = require('sequelize');
const FoodCategoryMapping = require('./foodCategoryMapping');
module.exports = class Food extends Sequelize.Model {
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
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        image: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      },
      {
        indexes: [
          {
            name: 'food_name_index',
            fields: ['name'],
          },
        ],
        sequelize,
        timestamps: false,
        underscored: true,
        paranoid: false,
        modelName: 'food',
        tableName: 'Food',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(models) {
    this.hasMany(models.Prefer, { foreignKey: 'foodId', sourceKey: 'id' });
    this.belongsToMany(models.FoodCategory, {
      through: FoodCategoryMapping,
    });
    this.hasMany(models.Top5, { foreignKey: 'foodId', sourceKey: 'id' });
    this.hasMany(models.Recipe, { foreignKey: 'foodId', sourceKey: 'id' });
  }
};
