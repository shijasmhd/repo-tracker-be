const httpStatus = require('http-status');
const userService = require('../services/user-service');
const tryCatchUtil = require('../utils/tryCatchUtil');

const register = tryCatchUtil(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).json(user);
});

const login = tryCatchUtil(async (req, res) => {
  const user = await userService.loginUser(req.body);

  // TODO: await tokenService.createAuthTokens

  res.json(user);
});

module.exports = {
  register,
  login,
};