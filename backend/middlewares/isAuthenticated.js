const ErrorResponse = require('../common/response/errorResponse');
const {
  CreateErrorCode,
  ErrorCode,
} = require('../common/response/exception/errorCode');
const { asyncHandler } = require('../utils/asyncHandler');

const isAuthenticated = asyncHandler((req, res, next) => {
  if (req.session.user) {
    return next(); // 다음 미들웨어로 진행
  }
  throw new ErrorResponse(CreateErrorCode(ErrorCode.INVALID_PERMISSION));
});

module.exports = isAuthenticated;
