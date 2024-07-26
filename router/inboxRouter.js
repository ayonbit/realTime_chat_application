//Dependencies
const express = require("express");
const { getInbox } = require("../controller/inboxController");
const decorateHTMLresponse = require("../middleware/common/decorateHTMLres");

//router
const router = express.Router();

//routes
router.get("/", decorateHTMLresponse("Inbox"), getInbox);

//module exports
module.exports = router;
