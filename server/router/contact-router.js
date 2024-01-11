const express = require("express");
const router = express.Router();
const contactForm = require("../controller/contact-Controller");

router.route("/contact").post(contactForm);

module.exports = router;