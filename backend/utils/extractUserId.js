const ErrorResponse = require('../common/response/errorResponse');
const {
  CreateErrorCode,
  ErrorCode,
} = require('../common/response/exception/errorCode');
const userService = require('../user/userService');

async function extractUserId(req) {
  const user = await userService.findUserById(req.session.user.id);
  if (!user) {
    throw new ErrorResponse(CreateErrorCode(ErrorCode.USER_NOT_FOUND));
  }
  return user.id;
}

module.exports = extractUserId;
