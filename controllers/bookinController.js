const Booking = require('../models/Booking');
const MovieTiming = require("../models/MovieTiming")

exports.createBooking = async (req, res) => {
  try {
    const { userId, movieTimingId, seats, totalPrice, bookingDate } = req.body;

    const newBooking = new Booking({
      userId,
      movieTimingId,
      seats,
      totalPrice,
      bookingDate,
    });

    await newBooking.save();

    res.status(201).json(newBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateBooking = async (req, res) => {
  try {
    const { userId, movieTimingId, seats, totalPrice, bookingDate } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        userId,
        movieTimingId,
        seats,
        totalPrice,
        bookingDate,
      },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);

    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

