const express = require("express");
const router = express.Router();
const authController = require('../controller/auth-controller');
const validate = require('../middlewares/validate-middleware');
const signUpSchema = require('../validators/auth-validator');


router.route("/").get(authController.home);
router.route("/register").post(validate(signUpSchema), authController.register);
router.route("/login").post(authController.login);

module.exports = router;