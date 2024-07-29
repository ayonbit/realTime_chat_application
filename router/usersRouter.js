//Dependencies
const express = require("express");

//Internal Dependencies
const { getUsers, addUsers } = require("../controller/usersController");
const decorateHTMLresponse = require("../middleware/common/decorateHTMLres");
const avatarUpload = require("../middleware/users/avatarUpload");
const {
  addUserValidators,
  addUserValidatorHandler,
} = require("../middleware/users/userValidator");

//router
const router = express.Router();

//user page routes
router.get("/", decorateHTMLresponse("Users"), getUsers);
//add user route
router.post(
  "/",
  avatarUpload,
  addUserValidators,
  addUserValidatorHandler,
  addUsers
);

//module exports
module.exports = router;
