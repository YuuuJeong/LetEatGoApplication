const express = require('express');
const router = express.Router();
const userController = require('./userController');
const userValidator = require('./validator/userValidator');
const isAuthenticated = require('../middlewares/isAuthenticated');
const { paginateValidator } = require('../common/validator/paginateValidtor');
const { idValidator } = require('../common/validator/idValidator');

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
  paginateValidator,
  userController.fetchMyShoppingLists,
);

router.post(
  '/me/shopping-lists',
  isAuthenticated,
  userValidator.addShoppingLists,
  userController.addShoppingLists,
);

router.delete(
  'me/shopping-lists/:id',
  isAuthenticated,
  idValidator,
  userController.deleteShoppingList,
);

router.get(
  '/me/inventories',
  isAuthenticated,
  paginateValidator,
  userController.fetchMyInventories,
);

router.post(
  '/me/inventories',
  isAuthenticated,
  userValidator.addInventories,
  userController.addInventories,
);

router.delete(
  '/me/inventories/:id',
  isAuthenticated,
  idValidator,
  userController.deleteInventory,
);

router.post(
  '/me/init-survey',
  isAuthenticated,
  userValidator.createSurvey,
  userController.createSurvey,
);
module.exports = router;
