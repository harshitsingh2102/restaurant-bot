const db = require('../db');

const Reservation = {
  book: (reservationData, callback) => {
    const {
      userId,
      restaurantId,
      date,
      time,
      guests,
      specialRequest
    } = reservationData;

    const reservationTime = `${date} ${time}`; // Combine date + time

    const sql = `
      INSERT INTO reservations
      (user_id, restaurant_id, reservation_time, number_of_people, special_request)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [userId, restaurantId, reservationTime, guests, specialRequest],
      (err, result) => {
        if (err) {
          console.error('DB Reservation Error:', err);
          return callback(err);
        }
        callback(null, result);
      }
    );
  },

  getAll: (callback) => {
    db.query('SELECT * FROM reservations', (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }
};

module.exports = Reservation;
