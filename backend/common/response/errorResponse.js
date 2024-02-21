const { ErrorCode } = require('./exception/errorCode');

class ErrorResponse extends Error {
  constructor(errorResponse) {
    super(errorResponse.message);
    this.code = errorResponse.code || ErrorCode.INTERNAL_SERVER_ERROR.code;
    this.errors = errorResponse.errors ? errorResponse.errors : undefined;
    this.stack = errorResponse.stack;
  }
}

module.exports = ErrorResponse;
