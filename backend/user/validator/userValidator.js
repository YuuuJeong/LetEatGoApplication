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

module.exports = {
  signIn,
  signUp,
  checkNickname,
};
