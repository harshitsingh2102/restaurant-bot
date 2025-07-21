// services/recommendation.js

const db = require('../db');

// 🔍 Get personalized or popular restaurant recommendations
const getRecommendations = async (userId) => {
  try {
    // Option 1: Based on user past orders (if implemented)
    const [orderBasedResults] = await db.query(
      `SELECT r.id, r.name, COUNT(*) as frequency
       FROM orders o
       JOIN restaurants r ON o.restaurant_id = r.id
       WHERE o.user_id = ?
       GROUP BY r.id
       ORDER BY frequency DESC
       LIMIT 5`,
      [userId]
    );

    // Option 2: Fallback to top-rated or random restaurants
    if (orderBasedResults.length > 0) {
      return orderBasedResults.map((r) => ({
        id: r.id,
        name: r.name
      }));
    }

    const [popularRestaurants] = await db.query(
      `SELECT id, name
       FROM restaurants
       ORDER BY rating DESC
       LIMIT 5`
    );

    return popularRestaurants;
  } catch (error) {
    console.error('❌ Recommendation Service Error:', error.message);
    return [];
  }
};

module.exports = { getRecommendations };
