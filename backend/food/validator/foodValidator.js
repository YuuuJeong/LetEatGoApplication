const { query } = require('express-validator');
const {
  paginateValidator,
} = require('../../common/validator/paginateValidtor');

const sizeValidator = [
  query('page')
    .customSanitizer((value) => value || 60)
    .isNumeric()
    .toInt()
    .withMessage('Page should be a number'),
];

const keywordValidator = [
  query('keyword').customSanitizer((value) => {
    return value ? value.split(' ') : [''];
  }),
  ...paginateValidator,
];

module.exports = {
  sizeValidator,
  keywordValidator,
};
