const Sequelize = require('sequelize');
const { hashPassword } = require('../common/utils/password');
const sexEnum = require('../common/enums/sexEnum');
const Prefer = require('./prefer');
const ShoppingList = require('./shoppingList');
const Inventory = require('./inventory');

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
        underscored: true,
        paranoid: true,
        modelName: 'user',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        tableName: 'User',
        hooks: {
          afterFind: (record, options) => {
            if (!record) {
              return;
            }
            if (Array.isArray(record)) {
              record.map((obj) => {
                delete obj.password;

                obj.sex = obj.sex === 1 ? sexEnum.MAN : sexEnum.WOMAN;
              });
            } else {
              delete record.password;
              record.sex = record.sex === 1 ? sexEnum.MAN : sexEnum.WOMAN;
            }
          },
          beforeSave: async (user, options) => {
            if (user.sex === sexEnum.MAN) {
              user.sex = 1;
            } else if (user.sex === sexEnum.WOMAN) {
              user.sex = 0;
            }
            user.password = await hashPassword(user.password);
          },
          afterDestroy: async (user, options) => {
            const cond = {
              where: {
                userId: user.id,
              },
              transaction: options.transaction,
            };

            await Promise.all([
              Prefer.destroy(cond),
              ShoppingList.destroy(cond),
              Inventory.destroy(cond),
            ]);
          },
        },
      },
    );
  }

  static associate(models) {
    this.hasMany(models.Prefer, {
      foreignKey: 'userId',
      onDelete: 'cascade',
      hooks: true,
    });
    this.hasMany(models.ShoppingList, {
      foreignKey: 'userId',
      sourceKey: 'id',
      onDelete: 'cascade',
      hooks: true,
    });
    this.hasMany(models.Inventory, {
      foreignKey: 'userId',
      sourceKey: 'id',
      onDelete: 'cascade',
      hooks: true,
    });
  }
};
