const express = require('express');
const router = express.Router();
const userController = require('./userController');
const userValidator = require('./validator/userValidator');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.post('/signup', userValidator.signUp, userController.signup);
router.post('/signin', userValidator.signIn, userController.signin);
router.get('/me/made-foods', isAuthenticated, userController.getUserMadeFoods);
router.get(
  '/me/liked-foods',
  isAuthenticated,
  userController.getUserLikedFoods,
);
router.get('/me/info', isAuthenticated, userController.getMyInfo);
router.post('/logout', userController.logout);
router.get(
  '/check-nickname',
  userValidator.checkNickname,
  userController.checkNicknameDuplicated,
);

router.post('/withdraw', isAuthenticated, userController.withdraw);
router.get(
  '/me/shopping-lists',
  isAuthenticated,
  userController.fetchMyShoppingLists,
);
module.exports = router;
