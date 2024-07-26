//Dependencies
const express = require("express");
const { getLogin } = require("../controller/loginController");
const decorateHTMLresponse = require("../middleware/common/decorateHTMLres");

//router
const router = express.Router();

//routes
router.get("/", decorateHTMLresponse("Login"), getLogin);

//module exports
module.exports = router;
