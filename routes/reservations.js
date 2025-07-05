const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// POST: Book a reservation
router.post('/', reservationController.bookReservation);

// GET: Get all reservations
router.get('/', reservationController.getReservations);

module.exports = router;
  // ✅ Make sure you're exporting the router

