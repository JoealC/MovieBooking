import {Booking} from '../models/Booking';
import { Theater } from '../models/Theater';
import {User} from '../models/User'
import { successResponse, errorResponse } from "../middleware/response";


export const createBooking = async(req, res, next) => {
  try{
    const{ movie, theaterId, user, seats, total_price} = req.body
    const theater = await Theater.findById(theaterId)
    if(!movie || !theaterId || !user){
      return errorResponse(res, 404, 'Movie, Theater or User not found ')

    }
    if(seats > theater.seats_available){
      return errorResponse(res, 400, "Not enough seats available")
    } 

    const newBooking = new Booking({
      movie: movie,
      theaterId,
      user,
      seats,
      total_price,
    })

    theater.seats_available -= seats

    await newBooking.save()
    await theater.save()

   return successResponse(res,201, "Booking created successfully")
  }catch(err){
    console.log(err)
   return errorResponse(res, 500, "Internal Server Error")
  }
}

export const getUserBookings = async(req, res) => {
  try{
    const bookings = await Booking.find({user:req.params.id}).populate('movie theater_Id')
    console.log(bookings)
    if (!bookings || bookings.length === 0) {
      return errorResponse(res, 400, "No Bookings found");
    }

    successResponse (res,200, ({bookings}))
  }catch(err){
    console.log(err)
    errorResponse(res, 500,"Internal Server Error")
  }
}

export const updateBooking = async (req, res) => {
  try {
    const { userId, movieTimingId, seats, total_price, bookingDate } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        userId,
        movieTimingId,
        seats,
        total_price,
        bookingDate,
      },
      { new: true }
    );

    if (!updatedBooking) {
      errorResponse(res, 404, 'Booking not found' );
    }

    successResponse(res, 200, (updatedBooking));
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Server error');
  }
};


export const deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);

    if (!deletedBooking) {
      errorResponse(res, 404, 'Booking not found');
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Server error' );
  }
}
