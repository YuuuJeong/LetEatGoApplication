const Sequelize = require('sequelize');
const User = require('./user');
const reactionEnum = require('../common/enums/reactionEnum');
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
          defaultValue: 0,
          allowNull: true,
        },
        favorite: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: true,
        },
        made: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: true,
        },
        view: {
          type: Sequelize.SMALLINT,
          defaultValue: 0,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        paranoid: true,
        modelName: 'prefer',
        tableName: 'Prefer',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        hooks: {
          beforeBulkCreate: (instances, options) => {
            instances.map((instance) => {
              instance.survey = instance.survey
                ? reactionEnum.LIKE
                : reactionEnum.DISLIKE;
            });
          },
        },
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    this.belongsTo(models.Food, { foreignKey: 'foodId' });
  }
};
