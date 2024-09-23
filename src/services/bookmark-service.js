const githubService = require('./github-service');
const bookMark = require('../models/bookmark');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const createBookMark = async (userId, url) => {
  const repoData = await githubService.getRepoData(url)
  return bookMark.createBookMark(userId, repoData);
};

const getBookMarks = async (userId, filter) => {
  return bookMark.getBookMarks(userId, filter);
};

const getBookMarksCountByDate = async (userId, filter) => {
  return bookMark.getBookMarksCountByDate(userId, filter);
};

const deleteBookMark = async (userId, bookMarkId) => {
  const row = await bookMark.getBookMarkById(userId, bookMarkId);
  if (!row) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bookmark not found');
  }

  return bookMark.deleteBookMark(userId, bookMarkId);
};

module.exports = {
  createBookMark,
  getBookMarks,
  getBookMarksCountByDate,
  deleteBookMark,
}