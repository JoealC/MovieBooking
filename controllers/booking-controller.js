const Booking = require('../models/Booking');
const Movie = require("../models/Movie")
const Theater = require("../models/Theater")
const User = require("../models/Theater")

const createBooking = async(req, res) => {
  try{
    const{ movie, theater, user, seats, time} = req.body

    // console.log(req.body)
    // const movie = await Movie.findById(req.body.movieId)
    // const theater = await Theater.findById(req.body.theaterId)
    // const user = await User.findById(req.body.userId)

    // console.log(movie)
    // console.log(theater)
    // console.log(user)


    if(!movie || !theater || !user){
      return res.status(404).json({ message : 'Movie, Theater or User not found '})

    }

    const seatsAvailabe = theater.seatsAvailable
    if(seats > seatsAvailabe){
      return res.status(400).json({message: "Not enough seats available"})
    }

    const totalPrice = movie.price * seats
    console.log(req.body.totalPrice)

    const newBooking = new Booking({
      movie: movie,
      theater: theater,
      user: user,
      seats,
      totalPrice,
      time
    })

    theater.seatsAvailable -= seats

    await newBooking.save()
    return res.status(201).json({message:"Booking created successfully"})
  }catch(err){
    console.log(err)
    return res.status(500).json({message: "Internal Server Error"})
  }
}

const getUserBookings = async(req, res) => {
  try{
    const userId = req.user.id
    const bookings = await Booking.find({user:userId}).populate('movie theater')

    return res.status(200).json({bookings})
  }catch(err){
    return res.status(500).json({message:"Internal Server Error"})
  }
}

const updateBooking = async (req, res) => {
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


const deleteBooking = async (req, res) => {
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

module.exports = { createBooking, getUserBookings, updateBooking, deleteBooking}