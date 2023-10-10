import { Router } from 'express';
const movieRouter = Router();
import { createMovie, getAllMovies, getMovieById, updateMovie, deleteMovie } from '../controllers/movie-controller';
import { authenticateToken } from "../middleware/authMiddleware";

movieRouter.post('/',authenticateToken, createMovie);
movieRouter.get('/', getAllMovies);
movieRouter.get('/:id', getMovieById);
movieRouter.put('/:id', updateMovie);
movieRouter.delete('/:id', deleteMovie);

export default movieRouter