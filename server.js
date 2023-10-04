const express = require('express');
const bodyParser = require('body-parser');
const connectDatabase = require('./config/database');
//const authMiddleware = require('./middleware/authMiddleware')

const app = express();
const PORT = process.env.PORT || 3000;
connectDatabase();

app.use(bodyParser.json());

const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin');
const movierRoutes = require('./routes/movie')
const theaterRoutes = require('./routes/theater')
const bookingRoutes = require('./routes/booking')
const userRoutes = require("./routes/user");
const authenticateToken = require('./middleware/authMiddleware');



app.use("/auth", authRoutes)
app.use('/admin', authenticateToken, adminRoutes)
app.use("/user", userRoutes)
app.use("/movies", movierRoutes)
app.use("/theaters", theaterRoutes)
app.use('/bookings', bookingRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });