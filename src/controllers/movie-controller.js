import {Movie} from '../models/Movie';
import { successResponse, errorResponse } from "../middleware/response";



export const createMovie = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    const newMovie = new Movie({
      title,
      description,
      price
    });

    await newMovie.save();

    successResponse(res,201, (newMovie));
  } catch (error) {
    console.error(error);
    errorResponse (res,500,'Server error');
  }
};


export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    successResponse (res,200,({movies}));
  } catch (error) {
    console.error(error);
    errorResponse(res,500,'Server error');
  }
};


export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      errorResponse(res,404,'Movie not found');
    }

    successResponse (res,200,(movie));
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Server error' );
  }
};


export const updateMovie = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        price,
      },
      { new: true }
    );

    if (!updatedMovie) {
      errorResponse(res, 404, 'Movie not found');
    }

    successResponse (res, 200, ({updatedMovie}));
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Server error' );
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    if (!deletedMovie) {
      errorResponse(res, 404, 'Movie not found' );
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    errorResponse( res, 500, 'Server error');
  }
};

