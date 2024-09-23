const axios = require('axios');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const getRepoData = async (url) => {
  try {
    const repo = await axios.get(url);

    const { id, name, owner: { login: ownerName } } = repo.data;

    return { id, name, ownerName, url };
  } catch (error) {
    if (error.status === httpStatus.NOT_FOUND) {
      throw new ApiError(httpStatus.NOT_FOUND, 'invalid repo url');
    }

    throw (error);
  }
};

module.exports = {
  getRepoData,
}