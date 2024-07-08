const Order = require("../models/Order");
const { NotFoundError } = require("../errors");

const getUserOrders = async (req, res) => {
  const createdBy = req.user.id;
  const orders = await Order.find({ createdBy });
  res.status(200).json({ orders });
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(200).json({ orders });
};

const createOrder = async (req, res) => {
  console.log(req.body);
  req.body.createdBy = req.user.id;
  const order = await Order.create(req.body);
  res.status(200).json({ order });
};

const getSingleOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findOne({ _id: id });
  if (!order) {
    throw new NotFoundError(`No order with id ${id}`);
  }
  res.status(200).json({ order });
};

module.exports = {
  getUserOrders,
  getAllOrders,
  createOrder,
  getSingleOrder,
};
