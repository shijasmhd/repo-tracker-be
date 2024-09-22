const express = require('express');
const router = express.Router();
const bookMarkController = require('../../controllers/bookmark-controller');

router.post('/:userId/bookmarks', bookMarkController.addBookMark);
router.post('/:userId/bookmarks/upload', bookMarkController.uploadCsvBookmarks);
router.get('/:userId/bookmarks', bookMarkController.getBookMarks);
router.delete('/:userId/bookmarks/:bookmarkId', bookMarkController.deleteBookMark);

module.exports = router;