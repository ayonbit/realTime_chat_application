//Dependencies
const express = require("express");
const { getUsers } = require("../controller/usersController");
const decorateHTMLresponse = require("../middleware/common/decorateHTMLres");

//router
const router = express.Router();

//routes
router.get("/", decorateHTMLresponse("Users"), getUsers);

//module exports
module.exports = router;
