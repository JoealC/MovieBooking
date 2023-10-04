const Movie = require('../models/Movie');
const Theater = require('../models/Theater');
const MovieTiming = require('../models/MovieTiming');


exports.createMovie = async (req, res) => {
  try {
    const { title, description, releaseDate, duration } = req.body;

    const newMovie = new Movie({
      title,
      description,
      releaseDate,
      duration,
    });

    await newMovie.save();

    res.status(201).json(newMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.createTheater = async (req, res) => {
  try {
    const { name, location, capacity } = req.body;

    const newTheater = new Theater({
      name,
      location,
      capacity,
    });

    await newTheater.save();

    res.status(201).json(newTheater);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.createMovieTiming = async (req, res) => {
  try {
    const { movieId, theaterId, showtime, availableSeats } = req.body;

    const newMovieTiming = new MovieTiming({
      movieId,
      theaterId,
      showtime,
      availableSeats,
    });

    await newMovieTiming.save();

    res.status(201).json(newMovieTiming);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};