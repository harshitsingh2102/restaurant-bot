// controllers/orderController.js

const orderModel = require('../models/orderModel');

exports.getAllOrders = async (req, res) => {
  const orders = await orderModel.getAllOrders();
  res.json(orders);
};

exports.placeOrder = async (req, res) => {
  const { userId, items } = req.body;
  const result = await orderModel.placeOrder(userId, items);
  res.status(201).json(result);
};
