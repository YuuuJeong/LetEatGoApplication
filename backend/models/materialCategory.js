const Sequelize = require('sequelize');
module.exports = class MaterialCategory extends Sequelize.Model {
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
        modelName: 'materialCategory',
        tableName: 'MaterialCategory',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(models) {
    this.hasMany(models.Material, {
      foreignKey: 'categoryId',
      sourceKey: 'id',
    });
  }
};
