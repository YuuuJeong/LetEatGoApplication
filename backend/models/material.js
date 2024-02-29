const Sequelize = require('sequelize');
const RecipeMaterialMapping = require('./recipeMaterialMapping');
module.exports = class Material extends Sequelize.Model {
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
        categoryId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        paranoid: false,
        modelName: 'material',
        tableName: 'Material',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.MaterialCategory, {
      foreignKey: 'categoryId',
      targetKey: 'id',
    });
    this.belongsToMany(models.Recipe, {
      through: RecipeMaterialMapping,
      foreignKey: 'id',
    });
  }
};
