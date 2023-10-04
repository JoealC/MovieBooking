const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


router.post('/movies', adminController.createMovie);
router.post('/theaters', adminController.createTheater);
router.post('/movie-timings', adminController.createMovieTiming);

module.exports = router