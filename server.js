const express = require('express');
const bodyParser = require('body-parser');
const connectDatabase = require('./config/database');
//const authMiddleware = require('./middleware/authMiddleware')

const app = express();
const PORT = process.env.PORT || 3000;
connectDatabase();

app.use(bodyParser.json());


const adminRoutes = require("./routes/admin-routes")
const userRoutes = require("./routes/user-routes")
const movieRoutes = require('./routes/movie-routes')
const theaterRoutes = require('./routes/theater-routes')
const bookingRoutes = require('./routes/booking-routes')



app.use('/api', adminRoutes)
app.use("/api", userRoutes)
app.use("/api", movieRoutes)
app.use("/api", theaterRoutes)
app.use('/api', bookingRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });