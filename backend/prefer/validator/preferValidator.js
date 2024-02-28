const { body, oneOf } = require('express-validator');
const reactionEnum = require('../../common/enums/reactionEnum');

const upsertPreferValidator = [
  body('foodId').notEmpty().isNumeric().withMessage('should be numeric type'),
  oneOf([
    body('survey')
      .notEmpty()
      .withMessage('Survey should not be empty')
      .isIn([reactionEnum.LIKE, reactionEnum.DISLIKE]) //TODO: express-validator isEnum validation 제공시 수정
      .withMessage('Survey should be -1 or 1'),

    body('favorite')
      .notEmpty()
      .withMessage('Favorite should not be empty')
      .isBoolean()
      .withMessage('Favorite should be a boolean'),

    body('made')
      .notEmpty()
      .withMessage('Made should not be empty')
      .isBoolean()
      .withMessage('Made should be a boolean'),

    body('view')
      .notEmpty()
      .withMessage('View should not be empty')
      .isIn([reactionEnum.LIKE, reactionEnum.DISLIKE])
      .withMessage('View should be -1 or 1'),
  ]),
];

module.exports = {
  upsertPreferValidator,
};
