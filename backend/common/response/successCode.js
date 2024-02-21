const { HttpStatusCode } = require('axios');

const code = HttpStatusCode.Ok;

function CreateSuccessResponse(message, result) {
  return {
    code,
    message,
    result: result || undefined,
  };
}

module.exports = {
  CreateSuccessResponse,
};
