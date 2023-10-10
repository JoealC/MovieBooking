import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  theater_Id: {
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
  total_price: {
    type: Number,
  },
  created_at:{
    type: Date,
    default: Date.now,
    status: {type: Number, default: 1}
  },

});

export const Booking = mongoose.model('Booking', bookingSchema)