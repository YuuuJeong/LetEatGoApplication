const { ErrorCode } = require('../common/response/exception/errorCode');
const { logger } = require('../config/winston');

const globalErrorHandler = (err, req, res, next) => {
  const error = { ...err };
  const data = {
    code: error.code || ErrorCode.INTERNAL_SERVER_ERROR.code,
    message: err.message,
    errors: error.errors,
  };

  // status code 500 or unknown error
  if (data.code === ErrorCode.INTERNAL_SERVER_ERROR.code || !data.code) {
    logger.error(`UNHANDLED ERROR : ${err.stack}\n`);
  }

  return res.status(data.code).json(data);
};

module.exports = globalErrorHandler;
