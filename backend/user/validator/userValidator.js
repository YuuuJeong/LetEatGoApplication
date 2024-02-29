const { body, query } = require('express-validator');

const signUp = [
  body('email', 'email does not Empty').notEmpty(),
  body('email', 'Invalid email').isEmail(),
  body('password', 'The minimum password length is 8 characters').isLength({
    min: 8,
    max: 16,
  }),
  body('nickname', 'Invalid nickname')
    .notEmpty()
    .matches(/^[a-zA-Z0-9가-힣]{2,8}$/)
    .withMessage(
      'Invalid nickname. Should contain a combination of Korean, English, and numbers, and be 2 to 8 characters long',
    ),
  body('sex')
    .notEmpty()
    .withMessage('Sex should not be empty')
    .isIn(['남자', '여자'])
    .withMessage('Invalid value for sex. Should be "남자" or "여자"'),
];

const signIn = [
  body('email', 'email does not Empty').notEmpty(),
  body('email', 'Invalid email').isEmail(),
  body('password', 'The minimum password length is 8 characters').isLength({
    min: 8,
  }),
];

const checkNickname = [
  query('nickname', 'nickname does not Empty').notEmpty().isString(),
];

const addShoppingLists = [
  body('shoppingLists')
    .isArray()
    .withMessage('Shopping lists must be an array'),
  body('shoppingLists.*.materialId')
    .isNumeric()
    .withMessage('Material ID must be numeric'),
  body('shoppingLists.*.unit').isString().withMessage('Unit must be a string'),
];

const addInventories = [
  body('inventories').isArray().withMessage('inventories must be an array'),
  body('inventories.*.materialId')
    .isNumeric()
    .withMessage('Material ID must be numeric'),
  body('inventories.*.unit').isString().withMessage('Unit must be a string'),
];

const createSurvey = [
  body('surveys').isArray().withMessage('surveys should be an array'),
  body('surveys.*.foodId').isInt().withMessage('foodId should be an integer'),
  body('surveys.*.like').isBoolean().withMessage('like should be a boolean'),
];

module.exports = {
  signIn,
  signUp,
  checkNickname,
  addShoppingLists,
  addInventories,
  createSurvey,
};
