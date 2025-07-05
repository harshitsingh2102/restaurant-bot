// models/restaurantModel.js

const db = require('../db');

// Simple keyword-based search in name, cuisine, or location
exports.findRestaurantsByKeywords = async (keywords) => {
  try {
    let query = `SELECT * FROM restaurants WHERE `;
    const conditions = keywords.map(word => 
      `(name LIKE ? OR cuisine LIKE ? OR location LIKE ?)`
    );
    query += conditions.join(' AND ');

    const values = keywords.flatMap(word => [`%${word}%`, `%${word}%`, `%${word}%`]);

    const [rows] = await db.execute(query, values);
    return rows;
  } catch (error) {
    console.error("❌ Error in restaurantModel:", error.message);
    return [];
  }
};
