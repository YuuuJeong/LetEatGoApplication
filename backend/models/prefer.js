const { INTEGER } = require("sequelize");
const Sequelize = require("sequelize");
module.exports = class Prefer extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.STRING(50),
          allowNull: false,
          primaryKey: true,
        },
        foodid: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        survey: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        like: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        made: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        view: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        paranoid: false,
        modelName: "Prefer",
        tableName: "prefer",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Prefer.belongsToMany(db.Food, {
      foreignKey: "foodid",
      sourceKey: "foodid",
    });
  }
};
