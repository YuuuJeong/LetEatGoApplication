const { param } = require('express-validator');

const idValidator = [param('id').isNumeric().withMessage('ID must be numeric')];

module.exports = {
  idValidator,
};
