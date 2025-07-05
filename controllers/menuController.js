const Menu = require('../models/menuModel');

exports.getAllMenus = (req, res) => {
    Menu.getAllMenus((err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

exports.getMenuByRestaurantId = (req, res) => {
    const id = req.params.restaurantId;
    Menu.getMenuByRestaurantId(id, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};
