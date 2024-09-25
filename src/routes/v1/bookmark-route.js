const express = require("express");
const router = express.Router();
const bookMarkController = require("../../controllers/bookmark-controller");
const validate = require("../../middlewares/validate");
const bookmarkValidations = require("../../validations/bookmark-validation");
const authMiddleWare = require("../../middlewares/auth-middleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post(
  "/:userId/bookmarks",
  authMiddleWare(),
  validate(bookmarkValidations.addBookMark),
  bookMarkController.addBookMark
);

router.post(
  "/:userId/bookmarks/upload",
  authMiddleWare(),
  validate(bookmarkValidations.uploadCsvBookmarks),
  upload.single("csvFile"),
  bookMarkController.uploadCsvBookmarks
);

router.get(
  "/:userId/bookmarks",
  authMiddleWare(),
  validate(bookmarkValidations.getBookMarks),
  bookMarkController.getBookMarks
);

router.get(
  "/:userId/bookmarks/stats",
  authMiddleWare(),
  validate(bookmarkValidations.getBookMarksStats),
  bookMarkController.getBookMarksStats
);

router.delete(
  "/:userId/bookmarks/:bookMarkId",
  authMiddleWare(),
  validate(bookmarkValidations.deleteBookMark),
  bookMarkController.deleteBookMark
);

module.exports = router;
