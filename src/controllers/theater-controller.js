import {Theater} from "../models/Theater"
import { successResponse, errorResponse } from "../middleware/response";


export const createTheater = async (req, res) => {
  try {
    const { name, location, seats_availabe } = req.body;

    const newTheater = new Theater({
      name,
      location,
      seats_availabe,
    });

    await newTheater.save();

    successResponse(res,201, "Theater created successfully");
  } catch (error) {
    console.error(error);
    errorResponse(res,500,'Server error' );
  }
};


export const getAllTheaters = async (req, res) => {
  try {
    const theaters = await Theater.find();
    successResponse(res, 200, ({theaters}));
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Server error');
  }
};


export const getTheaterById = async (req, res) => {
  try {
    const theaterId = req.params.id
    const theater = await Theater.findById(req.params.id);

    if (!theater) {
      errorResponse(res, 404, 'Theater not found');
    }

    res.status(200).json({theater});
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Server error');
  }
};


export const updateTheater = async (req, res) => {
  try {
    const { name, location, seats_availabe } = req.body;

    const updatedTheater = await Theater.findByIdAndUpdate(
      req.params.id,
      {
        name,
        location,
        seats_availabe,
      },
      { new: true }
    );

    if (!updatedTheater) {
      errorResponse(res, 404, 'Theater not found');
    }

    successResponse(res, 200, ({updatedTheater}));
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Server error');
  }
};


export const deleteTheater = async (req, res) => {
  try {
    const deletedTheater = await findByIdAndDelete(req.params.id);

    if (!deletedTheater) {
      errorResponse(res, 404, 'Theater not found');
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Server error');
  }
}

