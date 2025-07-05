// controllers/restaurantController.js

const restaurantModel = require('../models/restaurantModel');

exports.searchRestaurants = async (userMessage) => {
  try {
    // 👇 Basic example: extract keywords manually or from CLU (to be improved later)
    const keywords = userMessage.split(' ');

    const results = await restaurantModel.findRestaurantsByKeywords(keywords);
    return results;
  } catch (error) {
    console.error("❌ Error in restaurantController:", error.message);
    return [];
  }
};
