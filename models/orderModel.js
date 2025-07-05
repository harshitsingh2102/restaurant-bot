// models/orderModel.js

const db = require('../db');

exports.getAllOrders = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM orders', (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

exports.placeOrder = (userId, items) => {
  return new Promise((resolve, reject) => {
    // You can write actual SQL insert logic here
    resolve({ message: 'Order placed (dummy)', userId, items });
  });
};
