const tryCatchUtil = require('../utils/tryCatchUtil');
const bookMarkService = require('../services/bookmark-service');
const httpStatus = require('http-status');

const addBookMark = tryCatchUtil(async (req, res) => {
  // await bookMarkService.createBookMark(req);
  // res.status(httpStatus.OK);
  res.send('add new bookmard');
});

const uploadCsvBookmarks = (req, res) => {
  res.send('Upload csv');
};

const getBookMarks = (req, res) => {
  res.send('Get Bookmarks');
};

const deleteBookMark = (req, res) => {
  res.send('Delete bookmark');
};

module.exports = {
  addBookMark,
  uploadCsvBookmarks,
  getBookMarks,
  deleteBookMark,
}