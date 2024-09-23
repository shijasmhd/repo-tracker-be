const express = require('express');
const router = express.Router();
const bookMarkController = require('../../controllers/bookmark-controller');

router.post('/:userId/bookmarks', bookMarkController.addBookMark);
router.post('/:userId/bookmarks/upload', bookMarkController.uploadCsvBookmarks);
router.get('/:userId/bookmarks', bookMarkController.getBookMarks);
router.get('/:userId/bookmarks/stats', bookMarkController.getBookMarksStats);
router.delete('/:userId/bookmarks/:bookMarkId', bookMarkController.deleteBookMark);

module.exports = router;