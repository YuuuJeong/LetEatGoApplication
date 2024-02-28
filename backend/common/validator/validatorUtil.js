const { validationResult } = require('express-validator');

function hasErrorsInValidation(req) {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    throw new ErrorResponse(
      CreateErrorCode(ErrorCode.INVALID_REQUEST_PARAM, errors),
    );
  }
}

module.exports = hasErrorsInValidation;
