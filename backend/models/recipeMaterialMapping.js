const Sequelize = require('sequelize');
module.exports = class RecipeMaterialMapping extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        recipeId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        materialId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        unit: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        paranoid: false,
        modelName: 'recipeMaterialMapping',
        tableName: 'Recipe_Material',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }
};
