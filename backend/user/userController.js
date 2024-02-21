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

  getMade: asyncHandler(async (req, res, next) => {
    const userId = req.session.user.id;

    const foodIds = await Prefer.findAll({
      attributes: ['foodid'],
      where: {
        userid: userId,
        made: true,
      },
    }).map((item) => item.foodid);

    const foodData = await Food.findAll({
      attributes: ['Name', 'Image', 'foodid'],
      where: {
        foodid: { [Op.in]: foodIds },
      },
    });
    return res.json({
      statusCode: CODE.SUCCESS,
      msg: '만들어본 음식들 리스트입니다.',
      result: foodData,
    });
  }),
  getLike: async (req, res, err) => {
    try {
      const userLike = await Prefer.findAll({
        attributes: ['foodid'],
        raw: true,
        where: {
          userid: req.query.userid,
          favorite: true,
        },
      });
      let foodarr = [];
      for (let i = 0; i < userLike.length; i++) {
        foodarr.push(userLike[i].foodid);
      }
      const foodData = await Food.findAll({
        attributes: ['Name', 'Image', 'foodid'],
        raw: true,
        where: {
          foodid: { [Op.in]: foodarr },
        },
      });
      return res.json({
        statusCode: CODE.SUCCESS,
        msg: '해당 유저가 좋아요 누른 음식들 리스트입니다.',
        result: foodData,
      });
    } catch (err) {
      console.error(err);
      return res.json({ statusCode: CODE.FAIL, msg: '데이터베이스 오류' });
    }
  },
  updateLike: async (req, res, err) => {
    try {
      const updateUser = await Prefer.update(
        {
          favorite: req.body.favorite,
        },
        {
          where: {
            userid: req.body.userid,
            foodid: req.body.foodid,
          },
        },
      ); // User 찾고 좋아요 업데이트
      if (updateUser) {
        return res.json({
          statusCode: CODE.SUCCESS,
          msg: '좋아요를 업데이트시켰습니다.',
        });
      } else {
        return res.json({
          statusCode: CODE.FAIL,
          msg: '업데이트 시킬 데이터가 없습니다.',
        });
      }
    } catch (err) {
      console.error(err);
      return res.json({ statusCode: CODE.FAIL, msg: 'db 오류' });
    }
  },
  updateMade: async (req, res, err) => {
    try {
      const deleteFood = await Prefer.update(
        {
          made: false,
        },
        {
          where: {
            userid: req.body.userid,
            foodid: req.body.foodid,
          },
        },
      );

      if (deleteFood) {
        return res.json({
          statusCOde: CODE.SUCCESS,
          msg: '만들어본 음식을 삭제하였습니다.',
        });
      } else {
        return (
          res,
          json({
            statusCode: CODE.FAIL,
            msg: '해당 유저의 선택한 음식이 데이터베이스에 없습니다.',
          })
        );
      }
    } catch (error) {
      console.error(error);
      return res.json({ statusCode: CODE.FAIL, msg: 'db 오류' });
    }
  },
};

module.exports = userController;
