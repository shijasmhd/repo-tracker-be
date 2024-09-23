const { User } = require('../utils/db');
const generateId = require('../utils/generateId');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUNDS);

const getUserDetailsByName = (userName) => {
  return User.findUnique({
    where: { userName }
  });
};

const getUserDetailsById = (id) => {
  return User.findUnique({
    where: { id }
  });
};

const createUser = async (userBody) => {
  const password =
    await bcrypt.hash(userBody.password, saltRounds);

  return User.create({
    data: {
      id: generateId(),
      userName: userBody.userName,
      password: password
    }
  });
};

module.exports = {
  getUserDetailsByName,
  getUserDetailsById,
  createUser,
}