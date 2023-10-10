import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price:{
    type: Number,
    required: true,
  },
    status:{
    type:Number,
    default: 1,
  },
  
},
{timestamps: true});

export const Movie = mongoose.model('Movie', movieSchema)