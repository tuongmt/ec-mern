const express = require("express");
const router = express.Router();
const {
  getUserOrders,
  getAllOrders,
  createOrder,
  getSingleOrder,
} = require("../controllers/Order");
const authenticateUser = require("../middlewares/auth");

router.route("/orders").get(authenticateUser, getUserOrders);
router.route("/orders").post(authenticateUser, createOrder);
router.route("/all-orders").get(getAllOrders);
router.route("/orders/:id").get(getSingleOrder);

module.exports = router;
