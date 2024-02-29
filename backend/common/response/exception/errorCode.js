const { HttpStatusCode } = require('axios');

const ErrorCode = {
  DUPLICATED_USER: {
    code: HttpStatusCode.Conflict,
    message: '이미 존재하는 유저입니다.',
  },
  INTERNAL_SERVER_ERROR: {
    code: HttpStatusCode.InternalServerError,
    message: 'Internal Server Error',
  },
  USER_NOT_FOUND: {
    code: HttpStatusCode.NotFound,
    message: '찾을 수 없는 회원입니다.',
  },
  INVALID_PASSWORD: {
    code: HttpStatusCode.Unauthorized,
    message: '유효하지 않은 패스워드입니다.',
  },
  INVALID_PERMISSION: {
    code: HttpStatusCode.Unauthorized,
    message: 'Permission is invalid',
  },
  INVALID_REQUEST_PARAM: {
    code: HttpStatusCode.BadRequest,
    message: '잘못된 요청입니다.',
  },
  DUPLICATED_EMAIL: {
    code: HttpStatusCode.BadRequest,
    message: '이미 존재하는 이메일입니다.',
  },
  WITHDRAW_USER: {
    code: HttpStatusCode.Unauthorized,
    message: '탈퇴한 회원입니다.',
  },
  DUPLICATED_NICKNAME: {
    code: HttpStatusCode.BadRequest,
    message: '이미 존재하는 닉네임입니다.',
  },
  PASSWORD_NOT_MATCH: {
    code: HttpStatusCode.Unauthorized,
    message: '비밀번호가 일치하지 않습니다.',
  },
  SAME_REQUEST: {
    code: HttpStatusCode.BadRequest,
    message: '단시간내에 동일한 요청을 보낼 수 없습니다.',
  },
  FOOD_NOT_FOUND: {
    code: HttpStatusCode.NotFound,
    message: '찾을 수 없는 음식입니다.',
  },
  RECIPE_NOT_FOUND: {
    code: HttpStatusCode.NotFound,
    message: '찾을 수 없는 레시피입니다.',
  },
};

function CreateErrorCode({ code, message }, errors) {
  return {
    code,
    message,
    errors,
  };
}

module.exports = {
  CreateErrorCode,
  ErrorCode,
};
