const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user-controller");
const validate = require("../../middlewares/validate");
const authValidations = require("../../validations/auth-validation");

router.post(
  "/register",
  validate(authValidations.register),
  userController.register
);

router.post("/login", validate(authValidations.login), userController.login);

module.exports = router;
