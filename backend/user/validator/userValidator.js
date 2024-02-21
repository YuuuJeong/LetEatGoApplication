const { body } = require('express-validator');

const signUp = [
  body('email', 'Invalid does not Empty').not().isEmpty(),
  body('email', 'Invalid email').isEmail(),
  body('password', 'The minimum password length is 8 characters').isLength({
    min: 8,
  }),
];

const signIn = [
  body('email', 'Invalid does not Empty').not().isEmpty(),
  body('email', 'Invalid email').isEmail(),
  body('password', 'The minimum password length is 8 characters').isLength({
    min: 8,
  }),
];

module.exports = {
  signIn,
  signUp,
};
