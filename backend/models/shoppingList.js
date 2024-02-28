const Sequelize = require('sequelize');
module.exports = class ShoppingList extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        materialId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        unit: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        paranoid: true,
        modelName: 'shoppingList',
        tableName: 'ShoppingList',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
    this.belongsTo(models.Material, {
      foreignKey: 'materialId',
      targetKey: 'id',
    });
  }
};
