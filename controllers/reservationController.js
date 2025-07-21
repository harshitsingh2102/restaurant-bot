

const { parseTimeTo24Hr } = require('../utils/timeHelper');

// controllers/reservationController.js
const reservationModel = require('../models/reservationModel');

exports.makeReservation = async (req, res) => {
  try {
    const {
      date,
      time,
      guests,
      user_id,
      restaurant_id,
      special_request
    } = req.body;

    if (!date || !time || !guests) {
      return res.status(400).json({ error: 'Date, time, and guests are required' });
    }

    const reservation_time = `${date} ${time}`; // Combine properly

    const result = await reservationModel.book({
      reservation_time,
      number_of_people: guests,
      user_id,
      restaurant_id,
      special_request
    });

    res.status(200).json({ message: 'Reservation successful', reservationId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Reservation failed' });
  }
};



// ✅ Used by POST /reservations API
exports.bookReservation = (req, res) => {
  const newReservation = req.body;

  Reservation.book(newReservation, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Reservation booked!', id: result.insertId });
  });
};

// ✅ Used by GET /reservations API
exports.getReservations = (req, res) => {
  Reservation.getAll((err, reservations) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(reservations);
  });
};
