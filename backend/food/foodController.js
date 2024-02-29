const { CreateSuccessResponse } = require('../common/response/successCode');
const { asyncHandler } = require('../common/utils/asyncHandler');
const hasErrorsInValidation = require('../common/validator/validatorUtil');
const foodService = require('./foodService');

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
};

module.exports = foodController;
