const db = require('../db');

const Reservation = {
  book: (reservation, callback) => {
    const { user_id, restaurant_id, reservation_time, number_of_people, special_request } = reservation;
    const sql = `
      INSERT INTO reservations 
      (user_id, restaurant_id, reservation_time, number_of_people, special_request)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, [user_id, restaurant_id, reservation_time, number_of_people, special_request], callback);
  },

  getAll: (callback) => {
    db.query('SELECT * FROM reservations', callback);
  }
};

module.exports = Reservation;

