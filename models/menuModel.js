const db = require('../db');

// Get all menu items
exports.getAllMenus = (callback) => {
    const query = 'SELECT * FROM menus';
    db.query(query, callback);
};

// Get menu by restaurant ID
exports.getMenuByRestaurantId = (restaurantId, callback) => {
    const query = 'SELECT * FROM menus WHERE restaurant_id = ?';
    db.query(query, [restaurantId], callback);
};
