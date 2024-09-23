const express = require('express');
const router = express.Router();
const bookMarkController = require('../../controllers/bookmark-controller');
const validate = require('../../middlewares/validate');
const bookmarkValidations = require('../../validations/bookmark-validation');

router.post('/:userId/bookmarks',
  validate(bookmarkValidations.addBookMark), bookMarkController.addBookMark);

router.post('/:userId/bookmarks/upload', bookMarkController.uploadCsvBookmarks);

router.get('/:userId/bookmarks',
  validate(bookmarkValidations.getBookMarks), bookMarkController.getBookMarks);

router.get('/:userId/bookmarks/stats',
  validate(bookmarkValidations.getBookMarksStats), bookMarkController.getBookMarksStats);

router.delete('/:userId/bookmarks/:bookMarkId',
  validate(bookmarkValidations.deleteBookMark), bookMarkController.deleteBookMark);

module.exports = router;