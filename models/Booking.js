const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  theater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theater',
    required: true,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: String,
    required: true,
  },
  time:{
    type: Date,
    required: true
  },

});

module.exports = mongoose.model('Booking', bookingSchema)