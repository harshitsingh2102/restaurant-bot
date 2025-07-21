const reservationModel = require('../models/reservationModel');

// Core reservation logic (reusable in bot or routes)
exports.createReservation = async ({ userId, date, time, partySize }) => {
  try {
    const newReservation = await reservationModel.createReservation({
      userId,
      date,
      time,
      partySize,
      status: 'confirmed',
    });
    return newReservation;
  } catch (error) {
    console.error("❌ Error in createReservation:", error.message);
    throw error;
  }
};

// Express route handler
exports.makeReservation = async (req, res) => {
  try {
    const { userId, date, time, partySize } = req.body;
    const reservation = await exports.createReservation({ userId, date, time, partySize });
    res.status(201).json({ success: true, data: reservation });
  } catch (error) {
    console.error("Reservation Error:", error);
    res.status(500).json({ success: false, message: "Reservation failed" });
  }
};
