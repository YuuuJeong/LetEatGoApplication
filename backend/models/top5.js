const Sequelize = require('sequelize');
module.exports = class Top5 extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        foodId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        rank: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        indexes: [
          {
            name: 'inventory_food_id_index',
            fields: ['food_id'],
          },
        ],
        sequelize,
        timestamps: true,
        underscored: true,
        paranoid: true,
        modelName: 'top5',
        tableName: 'Top5',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Food, {
      foreignKey: 'foodId',
      targetKey: 'id',
    });
  }
};
