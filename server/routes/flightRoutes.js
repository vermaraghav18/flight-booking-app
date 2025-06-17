// server/routes/flightRoutes.js
const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');

// Flight search
router.get('/search', flightController.searchFlights);

// Flight details
router.get('/:flightId', flightController.getFlightDetails);

// Book flight
router.post('/book', flightController.bookFlight);

module.exports = router;