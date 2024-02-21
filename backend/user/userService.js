const { Op } = require('sequelize');
const User = require('../models/user');

const userService = {
  async findUserByEmail(email) {
    return User.findOne({
      where: {
        email,
      },
      paranoid: false,
    });
  },
  async createUser(user) {
    return User.create({
      ...user,
    });
  },
  async findUserByNickname(nickname) {
    return User.findOne({
      where: {
        nickname,
        deletedAt: null,
      },
      paranoid: false,
    });
  },
  async findUserById(userId) {
    return User.findByPk(userId, {
      raw: true,
    });
  },
};

module.exports = userService;
