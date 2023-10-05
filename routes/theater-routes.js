const express = require('express');
const router = express.Router();
const {createTheater, getAllTheaters, getTheaterById, updateTheater, deleteTheater} = require('../controllers/theater-controller');
const {authenticateToken} = require("../middleware/authMiddleware")

router.post('/theaters', authenticateToken, createTheater);
router.get('/theaters', getAllTheaters);
router.get('/theaters/:id', getTheaterById);
router.put('/:id', updateTheater);
router.delete('/:id', deleteTheater);

module.exports = router