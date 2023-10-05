const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  seatsAvailable: {
    type: Number,
  },
});

module.exports = mongoose.model('Theater', theaterSchema)