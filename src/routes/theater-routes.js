import { Router } from 'express';
const theaterRouter = Router();
import { createTheater, getAllTheaters, getTheaterById, updateTheater, deleteTheater } from '../controllers/theater-controller';
import { authenticateToken } from "../middleware/authMiddleware";

theaterRouter.post('/', authenticateToken, createTheater);
theaterRouter.get('/', getAllTheaters);
theaterRouter.get('/:id', getTheaterById);
theaterRouter.put('/:id', updateTheater);
theaterRouter.delete('/:id', deleteTheater);

export default theaterRouter