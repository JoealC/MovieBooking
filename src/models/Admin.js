import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status:{
    type:Number,
    default: 1,
  }
  
},
{timestamps: true});

export const Admin = mongoose.model('Admin', adminSchema)