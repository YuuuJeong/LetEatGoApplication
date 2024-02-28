const Sequelize = require('sequelize');
const User = require('./user');
const Food = require('./food');
const Recipe = require('./recipe');
const Prefer = require('./prefer');
const Inventory = require('./inventory');
const ShoppingList = require('./shoppingList');
const Material = require('./material');
const MaterialCategory = require('./materialCategory');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    dialect: config.dialect,
    host: config.host,
  },
);

db.sequelize = sequelize;

db.Material = Material;
db.Food = Food;
db.User = User;
db.Recipe = Recipe;
db.Prefer = Prefer;
db.Inventory = Inventory;
db.ShoppingList = ShoppingList;
db.MaterialCategory = MaterialCategory;

User.init(sequelize);
Prefer.init(sequelize);
Food.init(sequelize);
Recipe.init(sequelize);
Inventory.init(sequelize);
ShoppingList.init(sequelize);
Material.init(sequelize);
MaterialCategory.init(sequelize);

Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

module.exports = db;
