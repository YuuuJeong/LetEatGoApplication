const Sequelize = require('sequelize');

module.exports = class RecipeStep extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        order: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        recipeId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        paranoid: false,
        modelName: 'recipeStep',
        tableName: 'RecipeStep',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }
  static associate(models) {
    this.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
    });
  }
};
