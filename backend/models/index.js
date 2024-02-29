const Sequelize = require('sequelize');
const User = require('./user');
const Food = require('./food');
const Recipe = require('./recipe');
const Prefer = require('./prefer');
const Inventory = require('./inventory');
const ShoppingList = require('./shoppingList');
const Material = require('./material');
const MaterialCategory = require('./materialCategory');
const FoodCategory = require('./foodCategory');
const FoodCategoryMapping = require('./foodCategoryMapping');
const Top5 = require('./top5');
const RecipeMaterialMapping = require('./recipeMaterialMapping');
const RecipeStep = require('./recipeStep');

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

db.User = User;
db.Material = Material;
db.Food = Food;
db.FoodCategory = FoodCategory;
db.Recipe = Recipe;
db.Prefer = Prefer;
db.Inventory = Inventory;
db.ShoppingList = ShoppingList;
db.MaterialCategory = MaterialCategory;
db.FoodCategoryMapping = FoodCategoryMapping;
db.Top5 = Top5;
db.RecipeMaterialMapping = RecipeMaterialMapping;
db.RecipeStep = RecipeStep;

User.init(sequelize);
Prefer.init(sequelize);
Food.init(sequelize);
Recipe.init(sequelize);
Inventory.init(sequelize);
ShoppingList.init(sequelize);
Material.init(sequelize);
MaterialCategory.init(sequelize);
FoodCategory.init(sequelize);
FoodCategoryMapping.init(sequelize);
Top5.init(sequelize);
RecipeMaterialMapping.init(sequelize);
RecipeStep.init(sequelize);

Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

module.exports = db;
