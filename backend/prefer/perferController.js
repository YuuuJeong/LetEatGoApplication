const ErrorResponse = require('../common/response/errorResponse');
const { asyncHandler } = require('../utils/asyncHandler');
const {
  CreateErrorCode,
  ErrorCode,
} = require('../common/response/exception/errorCode');
const { CreateSuccessResponse } = require('../common/response/successCode');
const preferService = require('../prefer/preferService');
const extractUserId = require('../utils/extractUserId');
const redisClientSingleton = require('../utils/redisClient');

const preferController = {
  upsertPrefer: asyncHandler(async (req, res, next) => {
    const userId = extractUserId(req);
    const { foodId, ...data } = req.body;

    const redisKey = `prefer_${userId}_${foodId}`;
    const redisClient = redisClientSingleton.getClient();
    const tokenExists = await redisClient.exists(redisKey);

    if (tokenExists) {
      throw new ErrorResponse(CreateErrorCode(ErrorCode.SAME_REQUEST));
    }

    await Promise.all([
      redisClient.setex(redisKey, 5, 1),
      preferService.upsertUserPreferredFood({
        ...data,
        userId,
        foodId,
      }),
    ]);

    return res.json(CreateSuccessResponse('성공'));
  }),
};

module.exports = preferController;
