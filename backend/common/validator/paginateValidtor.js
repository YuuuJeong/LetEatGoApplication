const { query } = require('express-validator');

const paginateValidator = [
  query('size')
    .customSanitizer((value) => value || 10)
    .isNumeric()
    .toInt()
    .withMessage('Offset should be a number'),
  query('page')
    .customSanitizer((value) => value || 1)
    .isNumeric()
    .toInt()
    .withMessage('Page should be a number'),
];

module.exports = {
  paginateValidator,
};
