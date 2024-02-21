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
        hooks: {
          afterFind: async (record, options) => {
            if (!record) {
              return;
            }
            if (Array.isArray(record)) {
              record.map((obj) => {
                delete obj.password;
                obj.sex = obj.sex === 1 ? '남자' : '여자';
              });
            } else {
              delete record.password;
              record.sex = record.sex === 1 ? '남자' : '여자';
            }
          },
        },
      },
    );
  }

  static associate(models) {
    this.hasMany(models.Prefer, { foreignKey: 'userId', sourceKey: 'id' });
  }
};
