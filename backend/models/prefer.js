const Sequelize = require('sequelize');
module.exports = class Prefer extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        foodId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        survey: {
          type: Sequelize.SMALLINT,
          allowNull: true,
        },
        favorite: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        made: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        view: {
          type: Sequelize.SMALLINT,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        paranoid: false,
        modelName: 'prefer',
        tableName: 'Prefer',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }
};
