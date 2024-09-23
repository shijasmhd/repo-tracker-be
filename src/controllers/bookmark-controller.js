const tryCatchUtil = require('../utils/tryCatchUtil');
const bookMarkService = require('../services/bookmark-service');
const userService = require('../services/user-service');
const httpStatus = require('http-status');

const addBookMark = tryCatchUtil(async (req, res) => {
  const { params: { userId }, body: { url } } = req;

  await userService.isUserValid(userId);

  const bookMark = await bookMarkService.createBookMark(userId, url);
  res.status(httpStatus.OK).json(bookMark);
});

const uploadCsvBookmarks = (req, res) => {
  res.send('Upload csv');
};

const getBookMarks = tryCatchUtil(async (req, res) => {
  const { params: { userId }, query: { startDate, endDate, page } } = req;

  await userService.isUserValid(userId);

  const bookMarks =
    await bookMarkService.getBookMarks(userId, { startDate, endDate, page });

  res.status(httpStatus.OK).send(bookMarks);
});

const getBookMarksStats = tryCatchUtil(async (req, res) => {
  const { params: { userId }, query: { startDate, endDate } } = req;

  await userService.isUserValid(userId);

  const bookMarksStats =
    await bookMarkService.getBookMarksCountByDate(userId,
      { startDate, endDate });

  res.status(httpStatus.OK).send(bookMarksStats);
});

const deleteBookMark = tryCatchUtil(async (req, res) => {
  const { params: { userId, bookMarkId } } = req;

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
}