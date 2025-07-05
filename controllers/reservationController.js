const Reservation = require('../models/reservationModel');

exports.bookReservation = (req, res) => {
  const newReservation = req.body;

  Reservation.book(newReservation, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Reservation booked!', id: result.insertId });
  });
};

exports.getReservations = (req, res) => {
  Reservation.getAll((err, reservations) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(reservations);
  });
};

