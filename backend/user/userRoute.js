const express = require('express');
const router = express.Router();
const userController = require('./userController');
const userValidator = require('./validator/userValidator');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.post('/signup', userValidator.signUp, userController.signup);
router.post('/signin', userValidator.signIn, userController.signin);
router.get('/me/recipes', isAuthenticated, userController.getMade);
router.get('/like', isAuthenticated, userController.getLike);
// router.post("/like", userController.postLike);
// router.post("/made", userController.postMade);
router.put('/made/update', isAuthenticated, userController.updateMade);
router.put('/like/update', isAuthenticated, userController.updateLike);

module.exports = router;
