const joi = require("joi");

const passwordValidation = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least 1 letter and 1 number');
  }
  return value;
};

const register = {
  body: joi.object().keys({
    userName: joi.string().required(),
    password: joi.string().required().custom(passwordValidation)
  })
};

const login = {
  body: joi.object().keys({
    userName: joi.string().required(),
    password: joi.string().required().custom(passwordValidation)
  })
};

module.exports = {
  register,
  login,
}