const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  dashboard,
  getAllUsers,
  forgotPassword,
  sendEmail,
  resetPassword,
  loginAdmin,
} = require("../controllers/User");
const userAuthentication = require("../middlewares/auth");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/dashboard").get(userAuthentication, dashboard);
router.route("/all-users").get(getAllUsers);
router.route("/forgot-password").post(forgotPassword);
router.route("/send-email").post(sendEmail);
router.route("/reset-password").put(userAuthentication, resetPassword);
router.route("/login-admin").post(loginAdmin);

module.exports = router;
