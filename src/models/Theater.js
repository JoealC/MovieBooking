import mongoose from 'mongoose';

const theaterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  seats_available: {
    type: String,
    required: true,
  },
  created_at:{
    type: Date,
    default: Date.now,
    status: {type: Number, default: 1}
  },
},
{timestamps: true});

export const Theater = mongoose.model('Theater', theaterSchema)