const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings, updateBooking, deleteBooking} = require('../controllers/booking-controller');
const {authenticateToken} = require("../middleware/authMiddleware")


router.post('/bookings',authenticateToken, createBooking);
router.get('/bookings/user',authenticateToken, getUserBookings);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);

module.exports = router