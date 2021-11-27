const { Op } = require('sequelize');
const models = require('../models');

//유저 생성
exports.createUser = async (userId, encryptPassword, salt) => {
  try {
    const newUser = await models.user.create({
      id: userId,
      password: encryptPassword,
      salt,
    });
    return newUser;
  } catch (err) {
    throw err;
  }
};

//유저 읽기
exports.readUser = async userId => {
  try {
    const user = await models.user.findOne({
      where: {
        id: userId,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
};