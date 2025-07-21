const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const auth = require('../middleware/auth');

router.post('/reserve', auth, reservationController.makeReservation);


/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: API for managing restaurant reservations
 */

/**
 * @swagger
 * /api/reservations/reserve:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - time
 *               - guests
 *             properties:
 *               date:
 *                 type: string
 *                 example: "2025-07-25"
 *               time:
 *                 type: string
 *                 example: "6:00 PM"
 *               guests:
 *                 type: integer
 *                 example: 4
 *     responses:
 *       200:
 *         description: Reservation successful
 *       400:
 *         description: Bad request or invalid input
 *       500:
 *         description: Server error
 */
router.post('/reserve', reservationController.makeReservation);

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Get all reservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: List of reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   date:
 *                     type: string
 *                   time:
 *                     type: string
 *                   guests:
 *                     type: integer
 *       500:
 *         description: Server error
 */
router.get('/', reservationController.getReservations);

module.exports = router;
