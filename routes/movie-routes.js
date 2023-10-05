const express = require('express');
const router = express.Router();
const  {createMovie, getAllMovies, getMovieById, updateMovie, deleteMovie} = require('../controllers/movie-controller');
const {authenticateToken} = require("../middleware/authMiddleware")

router.post('/movies',authenticateToken, createMovie);
router.get('/movies', getAllMovies);
router.get('/movies/:id', getMovieById);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

module.exports = router