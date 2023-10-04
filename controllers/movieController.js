const Movie = require('../models/Movie');


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


exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateMovie = async (req, res) => {
  try {
    const { title, description, releaseDate, duration } = req.body;

    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        releaseDate,
        duration,
      },
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json(updatedMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    if (!deletedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};