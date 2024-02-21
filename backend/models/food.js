const Sequelize = require('sequelize');
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
        material: {
          type: Sequelize.JSON,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        kind: {
          type: Sequelize.TINYINT,
          allowNull: false,
        },
        image: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
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
  }
};
