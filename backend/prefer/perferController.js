const ErrorResponse = require('../common/response/errorResponse');

const {
  CreateErrorCode,
  ErrorCode,
} = require('../common/response/exception/errorCode');
const { CreateSuccessResponse } = require('../common/response/successCode');
const { asyncHandler } = require('../common/utils/asyncHandler');
const extractUserId = require('../common/utils/extractUserId');
const { redisClientSingleton } = require('../common/utils/redisClient');
const preferService = require('../prefer/preferService');

const preferController = {
  upsertPrefer: asyncHandler(async (req, res, next) => {
    const userId = await extractUserId(req);
    const { foodId, ...data } = req.body;
    const redisKey = `prefer_${userId}_${foodId}`;
    const ttl = 5;
    const tokenExists = await redisClientSingleton.checkKeyExists(redisKey);

    if (tokenExists) {
      throw new ErrorResponse(CreateErrorCode(ErrorCode.SAME_REQUEST));
    }

    await Promise.all([
      redisClientSingleton.setTemporaryKey(redisKey, ttl),
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
