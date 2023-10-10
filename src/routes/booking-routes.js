import { Router } from 'express';
const bookingRouter = Router();
import { createBooking, getUserBookings, updateBooking, deleteBooking } from '../controllers/booking-controller';
import { authenticateToken } from "../middleware/authMiddleware";


bookingRouter.post('/',authenticateToken, createBooking);
bookingRouter.get('/user/:id',authenticateToken, getUserBookings);
bookingRouter.put('/:id', updateBooking);
bookingRouter.delete('/:id', deleteBooking);

export default bookingRouter