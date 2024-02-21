const Food = require('../models/food');
const bcrypt = require('bcrypt');
const CODE = require('../modules/statusCode');
const Prefer = require('../models/prefer');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const ErrorResponse = require('../common/response/errorResponse');
const { asyncHandler } = require('../utils/asyncHandler');
const {
  CreateErrorCode,
  ErrorCode,
} = require('../common/response/exception/errorCode');
const userService = require('./userService');
const { CreateSuccessResponse } = require('../common/response/successCode');
const preferService = require('../prefer/preferService');
const extractUserId = require('../utils/extractUserId');
const foodService = require('../food/foodService');
const redisClientSingleton = require('../utils/redisClient');

const userController = {
  signup: asyncHandler(async (req, res, next) => {
    const { errors } = validationResult(req);
    const { email, password, nickname, ...data } = req.body;

    if (errors.length > 0) {
      throw new ErrorResponse(
        CreateErrorCode(ErrorCode.INVALID_REQUEST_PARAM, errors),
      );
    }

    let user = await userService.findUserByEmail(email);

    if (user) {
      if (user.deletedAt != null) {
        throw new ErrorResponse(CreateErrorCode(ErrorCode.WITHDRAW_USER));
      }
      throw new ErrorResponse(CreateErrorCode(ErrorCode.DUPLICATED_EMAIL));
    }

    user = await userService.findUserByNickname(nickname);

    if (user) {
      throw new ErrorResponse(CreateErrorCode(ErrorCode.DUPLICATED_NICKNAME));
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await userService.createUser({
      email,
      password: hashedPassword,
      nickname,
      ...data,
    });

    return res.json(CreateSuccessResponse('회원가입 성공'));
  }),
  signin: asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userService.findUserByEmail(email);
    if (!user) {
      throw new ErrorResponse(CreateErrorCode(ErrorCode.USER_NOT_FOUND));
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new ErrorResponse(CreateErrorCode(ErrorCode.PASSWORD_NOT_MATCH));
    }

    req.session.user = {
      id: user.id,
      nickname: user.nickname,
    };

    return res.json(CreateSuccessResponse('로그인 성공'));
  }),

  getUserMadeFoods: asyncHandler(async (req, res, next) => {
    const userId = extractUserId(req);

    const foods = await preferService.getFoodsByUserPrefer(userId, {
      made: true,
    });

    return res.json(
      CreateSuccessResponse('유저가 만들어본 음식 리스트입니다.', foods),
    );
  }),
  getUserLikedFoods: asyncHandler(async (req, res, next) => {
    const userId = extractUserId(req);

    const foods = await preferService.getFoodsByUserPrefer(userId, {
      favorite: true,
    });

    return res.json(
      CreateSuccessResponse('유저가 좋아요 누른 음식 리스트입니다', foods),
    );
  }),
  getMyInfo: asyncHandler(async (req, res, next) => {
    const userId = extractUserId(req);

    const user = await userService.findUserById(userId);

    if (!user) {
      throw new ErrorResponse(CreateErrorCode(ErrorCode.USER_NOT_FOUND));
    }

    if (user.deletedAt !== null) {
      throw new ErrorResponse(CreateErrorCode(ErrorCode.WITHDRAW_USER));
    }

    return res.json(CreateSuccessResponse('내 정보입니다.', user));
  }),
};

module.exports = userController;
