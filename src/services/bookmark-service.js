const githubService = require("./github-service");
const bookMark = require("../models/bookmark");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const parseBookMarksCsv = require("../utils/parseBookMarksCsv");

const createBookMark = async (userId, body) => {
  const row = await bookMark.getBookMarkById(userId, body.bookMarkId);
  if (row) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Bookmark already exists");
  }

  const repoData = await githubService.getRepoData(body.url);
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
    throw new ApiError(httpStatus.NOT_FOUND, "Bookmark not found");
  }

  return bookMark.deleteBookMark(userId, bookMarkId);
};

const uploadCsvBookmarks = async (userId, filePath) => {
  const urls = await parseBookMarksCsv(filePath);
  const results = {
    total: urls.length,
    added: 0,
    failed: 0,
    errors: [],
  };
  const insertArr = [];

  for (const url of urls) {
    try {
      // TODO: Need to manage 403 errors by rate limiting
      const repoData = await githubService.getRepoData(url);

      insertArr.push({
        id: repoData.id,
        url: repoData.url,
        htmlUrl: repoData.htmlUrl,
        repoName: repoData.name,
        repoOwner: repoData.ownerName,
        userId,
      });
    } catch (error) {
      results.failed++;
      results.errors.push({ url, error: error.message });
    }
  }

  try {
    const successCount = await bookMark.insertMultipleBookMarks(insertArr);
    results.added += successCount;
  } catch (error) {
    results.errors.push({ error: "Something went wrong" });
  }

  return results;
};

module.exports = {
  createBookMark,
  getBookMarks,
  getBookMarksCountByDate,
  deleteBookMark,
  uploadCsvBookmarks,
};
