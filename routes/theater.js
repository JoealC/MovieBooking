const express = require('express');
const router = express.Router();
const theaterController = require('../controllers/theaterController');


router.post('/', theaterController.createTheater);
router.get('/', theaterController.getAllTheaters);
router.get('/:id', theaterController.getTheaterById);
router.put('/:id', theaterController.updateTheater);
router.delete('/:id', theaterController.deleteTheater);

module.exports = router