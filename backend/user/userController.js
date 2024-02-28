const { validationResult } = require('express-validator');
const ErrorResponse = require('../common/response/errorResponse');
const { asyncHandler } = require('../common/utils/asyncHandler');
const {
  CreateErrorCode,
  ErrorCode,
} = require('../common/response/exception/errorCode');
const userService = require('./userService');
const { CreateSuccessResponse } = require('../common/response/successCode');
const preferService = require('../prefer/preferService');
const extractUserId = require('../common/utils/extractUserId');
const { comparePassword } = require('../common/utils/password');

const User = require('../models/user');
const db = require('../models');
const shoppingListService = require('../shoppingList/shoppingListService');
const inventoryService = require('../inventory/inventoryService');
const hasErrorsInValidation = require('../common/validator/validatorUtil');

const destroySession = (req) =>
  new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

const userController = {
  signup: asyncHandler(async (req, res) => {
    hasErrorsInValidation(req);
    const { email, password, nickname, ...data } = req.body;

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

    await userService.createUser({
      email,
      password,
      nickname,
      ...data,
    });

    return res.json(CreateSuccessResponse('회원가입 성공'));
  }),

  signin: asyncHandler(async (req, res) => {
    hasErrorsInValidation(req);

    const { email, password } = req.body;

    const user = await userService.findUserByEmail(email);

    if (!user) {
      throw new ErrorResponse(CreateErrorCode(ErrorCode.USER_NOT_FOUND));
    }

    if (user.deletedAt != null) {
      throw new ErrorResponse(CreateErrorCode(ErrorCode.WITHDRAW_USER));
    }

    if (!(await comparePassword(password, user.password))) {
      throw new ErrorResponse(CreateErrorCode(ErrorCode.PASSWORD_NOT_MATCH));
    }

    req.session.user = {
      id: user.id,
      nickname: user.nickname,
    };

    return res.json(CreateSuccessResponse('로그인 성공'));
  }),

  getUserMadeFoods: asyncHandler(async (req, res) => {
    const userId = await extractUserId(req);

    const foods = await preferService.getFoodsByUserPrefer(userId, {
      made: true,
    });

    return res.json(
      CreateSuccessResponse('유저가 만들어본 음식 리스트입니다.', foods),
    );
  }),

  getUserLikedFoods: asyncHandler(async (req, res) => {
    const userId = await extractUserId(req);

    const foods = await preferService.getFoodsByUserPrefer(userId, {
      favorite: true,
    });

    return res.json(
      CreateSuccessResponse('유저가 좋아요 누른 음식 리스트입니다', foods),
    );
  }),

  getMyInfo: asyncHandler(async (req, res) => {
    const userId = await extractUserId(req);

    const user = await userService.findUserById(userId);

    if (!user) {
      throw new ErrorResponse(CreateErrorCode(ErrorCode.USER_NOT_FOUND));
    }

    if (user.deletedAt !== null) {
      throw new ErrorResponse(CreateErrorCode(ErrorCode.WITHDRAW_USER));
    }

    return res.json(CreateSuccessResponse('내 정보입니다.', user));
  }),

  logout: asyncHandler(async (req, res) => {
    await destroySession(req);
    return res.json(CreateSuccessResponse('로그아웃 완료'));
  }),

  checkNicknameDuplicated: asyncHandler(async (req, res) => {
    hasErrorsInValidation(req);

    const { nickname } = req.query;
    const user = await userService.findUserByNickname(nickname);

    if (user) {
      throw new ErrorResponse(CreateErrorCode(ErrorCode.DUPLICATED_NICKNAME));
    }

    return res.json(
      CreateSuccessResponse(`${nickname}은 사용가능한 닉네임입니다.`),
    );
  }),

  fetchMyShoppingLists: asyncHandler(async (req, res) => {
    hasErrorsInValidation(req);
    const userId = await extractUserId(req);
    const paginateOptions = req.query;
    const shoppingLists = await shoppingListService.getMyShoppingLists(
      userId,
      paginateOptions,
    );

    return res.json(
      CreateSuccessResponse(
        '사야 할 식재료들을 조회하였습니다.',
        shoppingLists,
      ),
    );
  }),
  fetchMyInventories: asyncHandler(async (req, res) => {
    hasErrorsInValidation(req);
    const userId = await extractUserId(req);
    const paginateOptions = req.query;

    const shoppingLists = await inventoryService.getMyInventories(
      userId,
      paginateOptions,
    );

    return res.json(
      CreateSuccessResponse(
        '현재 보유하고 있는 식재료들을 조회하였습니다.',
        shoppingLists,
      ),
    );
  }),

  withdraw: asyncHandler(async (req, res) => {
    const userId = await extractUserId(req);

    await destroySession(req);
    await db.sequelize.transaction(async (t) => {
      await User.destroy({
        where: {
          id: userId,
        },
        individualHooks: true,
        transaction: t,
      });
    });

    return res.json(CreateSuccessResponse('탈퇴가 완료되었습니다.'));
  }),
};

module.exports = userController;
