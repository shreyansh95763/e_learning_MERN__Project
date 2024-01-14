const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const authController = require('../controller/auth-controller');
const validate = require('../middlewares/validate-middleware');
const signUpSchema = require('../validators/auth-validator');


router.route("/").get(authController.home);
router.route("/register").post(validate(signUpSchema), authController.register);
router.route("/login").post(authController.login);

router.route("/user").get(authMiddleware,authController.user);

module.exports = router;