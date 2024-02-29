const ErrorResponse = require('../common/response/errorResponse');
const {
  CreateErrorCode,
  ErrorCode,
} = require('../common/response/exception/errorCode');
const { asyncHandler } = require('../common/utils/asyncHandler');
const userService = require('../user/userService');

const isAuthenticated = asyncHandler(async (req, res, next) => {
  if (req.session.user && req.session.user.id) {
    const user = await userService.findUserById(req.session.user.id);

    if (!user) {
      throw new ErrorResponse(CreateErrorCode(ErrorCode.USER_NOT_FOUND));
    }

    return next();
  }

  throw new ErrorResponse(CreateErrorCode(ErrorCode.INVALID_PERMISSION));
});

module.exports = isAuthenticated;
