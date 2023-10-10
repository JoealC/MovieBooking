import express from 'express';
import adminRoutes from "./routes/admin-routes";
import userRoutes from "./routes/user-routes";
import movieRoutes from './routes/movie-routes';
import theaterRoutes from './routes/theater-routes';
import bookingRoutes from './routes/booking-routes';
import { json } from 'body-parser';
import {connectDatabase} from './config/database';
//const authMiddleware = require('./middleware/authMiddleware')

const app = express();
const PORT = 3000;
connectDatabase();

app.use(json());

app.use('/admin', adminRoutes)
app.use("/user", userRoutes)
app.use("/movie", movieRoutes)
app.use("/theater", theaterRoutes)
app.use('/booking', bookingRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });