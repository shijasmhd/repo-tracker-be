const tryCatchUtil = require("../utils/tryCatchUtil");
const bookMarkService = require("../services/bookmark-service");
const userService = require("../services/user-service");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const addBookMark = tryCatchUtil(async (req, res) => {
  const {
    params: { userId },
    body,
  } = req;

  await userService.isUserValid(userId);

  const bookMark = await bookMarkService.createBookMark(userId, body);
  res.status(httpStatus.OK).json(bookMark);
});

const uploadCsvBookmarks = tryCatchUtil(async (req, res) => {
  const {
    params: { userId },
    file,
  } = req;

  if (!file) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No file uploaded");
  }

  await userService.isUserValid(userId);

  const result = await bookMarkService.uploadCsvBookmarks(
    userId,
    req.file.path
  );
  res.status(httpStatus.OK).json(result);
});

const getBookMarks = tryCatchUtil(async (req, res) => {
  const {
    params: { userId },
    query: { startDate, endDate, page },
  } = req;

  await userService.isUserValid(userId);

  const bookMarks = await bookMarkService.getBookMarks(userId, {
    startDate,
    endDate,
    page,
  });

  res.status(httpStatus.OK).send(bookMarks);
});

const getBookMarksStats = tryCatchUtil(async (req, res) => {
  const {
    params: { userId },
    query: { startDate, endDate },
  } = req;

  await userService.isUserValid(userId);

  const bookMarksStats = await bookMarkService.getBookMarksCountByDate(userId, {
    startDate,
    endDate,
  });

  res.status(httpStatus.OK).send(bookMarksStats);
});

const deleteBookMark = tryCatchUtil(async (req, res) => {
  const {
    params: { userId, bookMarkId },
  } = req;

  await userService.isUserValid(userId);
  await bookMarkService.deleteBookMark(userId, parseInt(bookMarkId));

  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  addBookMark,
  uploadCsvBookmarks,
  getBookMarks,
  getBookMarksStats,
  deleteBookMark,
};
