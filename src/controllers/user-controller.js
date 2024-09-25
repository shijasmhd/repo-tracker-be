const httpStatus = require("http-status");
const userService = require("../services/user-service");
const tryCatchUtil = require("../utils/tryCatchUtil");
const tokenService = require("../services/auth-service");

const register = tryCatchUtil(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).json(user);
});

const login = tryCatchUtil(async (req, res) => {
  const user = await userService.loginUser(req.body);
  const token = await tokenService.createToken(user);

  user.token = token;

  res.json(user);
});

module.exports = {
  register,
  login,
};
