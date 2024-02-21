const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');
module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: Sequelize.STRING(50),
          unique: true,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        nickname: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        sex: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        paranoid: true,
        modelName: 'user',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        tableName: 'User',
      },
    );
  }
};
