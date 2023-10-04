const mongoose = require('mongoose');

const movieTimingSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  theaterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theater',
    required: true,
  },
  showtime: {
    type: Date,
    required: true,
  },
  availableSeats: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('MovieTiming', movieTimingSchema)