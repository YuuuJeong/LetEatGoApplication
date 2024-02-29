const ErrorResponse = require('../common/response/errorResponse');
const {
  CreateErrorCode,
  ErrorCode,
} = require('../common/response/exception/errorCode');
const { CreateSuccessResponse } = require('../common/response/successCode');
const { asyncHandler } = require('../common/utils/asyncHandler');
const hasErrorsInValidation = require('../common/validator/validatorUtil');
const { RecipeMaterialMapping, Material } = require('../models');
const recipeService = require('./recipeService');

const recipeController = {
  getRecipeDetails: asyncHandler(async (req, res) => {
    hasErrorsInValidation(req);

    const id = req.params.id;
    const recipe = await recipeService.findRecipeById(id);

    if (!recipe) {
      throw new ErrorResponse(CreateErrorCode(ErrorCode.RECIPE_NOT_FOUND));
    }

    const [materials, steps] = await Promise.all([
      RecipeMaterialMapping.findAll({
        where: {
          recipeId: id,
        },
        include: Material,
      }),
      RecipeStep.findAll({
        where: {
          recipeId: id,
        },
        order: [['order', 'asc']],
      }),
    ]);

    return res.json(
      CreateSuccessResponse('레시피 상세정보를 조회하였습니다.', {
        materials,
        steps,
      }),
    );
  }),
};

module.exports = recipeController;
