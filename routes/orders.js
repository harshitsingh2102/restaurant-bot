// routes/orders.js

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// ✅ Make sure all handlers are functions
router.get('/', orderController.getAllOrders); // example route
router.post('/', orderController.placeOrder);  // example route

module.exports = router;
