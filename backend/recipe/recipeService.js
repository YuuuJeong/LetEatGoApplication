const { Recipe } = require('../models');

const recipeService = {
  findRecipeById(id) {
    return Recipe.findByPk({
      where: {
        id,
      },
    });
  },
};

module.exports = recipeService;
