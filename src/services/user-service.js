const httpStatus = require('http-status');
const user = require('../models/user');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcrypt');

const createUser = async (userBody) => {
  if (await user.getUserDetailsByName(userBody.userName)) {
    throw (new ApiError(httpStatus.BAD_REQUEST, 'userName already taken'));
  }

  return user.createUser(userBody);
};

const loginUser = async (userBody) => {
  const userData = await user.getUserDetailsByName(userBody.userName);
  const verifyPassword = password => bcrypt.compare(userBody.password, password);

  if (!userData || !(await verifyPassword(userData.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }

  return userData;
};

module.exports = {
  createUser,
  loginUser,
}