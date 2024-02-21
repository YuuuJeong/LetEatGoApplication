const { asyncHandler } = require('../utils/asyncHandler');

const isAuthenticated = asyncHandler((req, res, next) => {
  if (req.session.user) {
    return next(); // 다음 미들웨어로 진행
  }
  return res.status(401).send('Unauthorized');
});

module.exports = isAuthenticated;
