const { INTEGER, STRING } = require('sequelize');
const Sequelize = require('sequelize');
const RecipeMaterialMapping = require('./recipeMaterialMapping');

module.exports = class Recipe extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        foodId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        indexes: [
          {
            name: 'recipe_title_index',
            fields: ['title'],
          },
        ],
        sequelize,
        timestamps: true,
        underscored: true,
        paranoid: true,
        modelName: 'recipe',
        tableName: 'Recipe',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(models) {
    this.belongsToMany(models.Material, {
      through: RecipeMaterialMapping,
      foreignKey: 'recipeId',
    });
    this.hasMany(models.Recipe, {
      foreignKey: 'recipeId',
    });
    this.belongsTo(models.Food, {
      foreignKey: 'foodId',
    });
  }
};
