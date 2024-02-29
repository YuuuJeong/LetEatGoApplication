const { Op } = require('sequelize');
const { CreateSuccessResponse } = require('../common/response/successCode');
const { asyncHandler } = require('../common/utils/asyncHandler');
const hasErrorsInValidation = require('../common/validator/validatorUtil');
const { Top5, Food, Prefer, Recipe } = require('../models');
const foodService = require('./foodService');
const extractUserId = require('../common/utils/extractUserId');
const preferService = require('../prefer/preferService');
const ErrorResponse = require('../common/response/errorResponse');
const {
  CreateErrorCode,
  ErrorCode,
} = require('../common/response/exception/errorCode');

const foodController = {
  getRandomFoods: asyncHandler(async (req, res) => {
    hasErrorsInValidation(req);

    const size = req.query.size;
    const foods = await foodService.getRandomFoods(size);
    return res.json(
      CreateSuccessResponse(
        `랜덤으로 ${size}개의 음식을 조회하였습니다`,
        foods,
      ),
    );
  }),
  getFoods: asyncHandler(async (req, res) => {
    hasErrorsInValidation(req);
    const { size, page, keyword } = req.query;

    const { rows, count } = await foodService.getFoods(keyword, size, page);

    return res.json(
      CreateSuccessResponse('음식을 조회하였습니다.', {
        nodes: rows,
        count,
      }),
    );
  }),
  getTop5Foods: asyncHandler(async (req, res) => {
    const currentDate = new Date();
    const start = new Date(
      currentDate.setDate(new Date().getDate() - 1),
    ).setHours(15);
    const end = currentDate.setHours(15);

    const top5 = await Top5.findAll({
      where: {
        createdAt: {
          [Op.gte]: start,
          [Op.lt]: end,
        },
      },
      include: Food,
      order: [['rank', 'asc']],
    });

    return res.json(
      CreateSuccessResponse('top 음식을 조회하였습니다.', {
        top5,
      }),
    );
  }),
  getFoodRecipes: asyncHandler(async (req, res) => {
    hasErrorsInValidation(req);
    const userId = extractUserId(req);
    const foodId = req.params.id;

    if (userId) {
      const prefer = await preferService.getPreferByPk(userId, foodId);
      prefer
        ? await preferService.incrementView(userId, foodId)
        : await preferService.createPrefer({
            userId,
            foodId,
            view: 1,
          });
    }

    const food = await foodService.getFoodById(foodId);

    if (!food) {
      throw new ErrorResponse(CreateErrorCode(ErrorCode.FOOD_NOT_FOUND));
    }

    const recipes = await Recipe.findAll({
      where: {
        foodId,
      },
    });

    return res.json(
      CreateSuccessResponse('음식의 레시피들을 조회하였습니다.', recipes),
    );
  }),
};

module.exports = foodController;
