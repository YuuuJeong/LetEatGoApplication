const { Op } = require('sequelize');
const User = require('../models/user');

const userService = {
  findUserByEmail(email) {
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
};

module.exports = userService;
