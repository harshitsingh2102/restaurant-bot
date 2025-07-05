const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all menu items
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM menus';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching menu:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
});

// Get menu items by restaurant ID
router.get('/:restaurantId', (req, res) => {
  const restaurantId = req.params.restaurantId;
  const sql = 'SELECT * FROM menus WHERE restaurant_id = ?';
  db.query(sql, [restaurantId], (err, results) => {
    if (err) {
      console.error('Error fetching menu:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
});

module.exports = router;
