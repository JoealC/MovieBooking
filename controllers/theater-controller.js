const Theater = require('../models/Theater');


const createTheater = async (req, res) => {
  try {
    const { name, location, seatsAvailabe } = req.body;

    const newTheater = new Theater({
      name,
      location,
      seatsAvailabe,
    });

    await newTheater.save();

    res.status(201).json({message: "Theater created successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getAllTheaters = async (req, res) => {
  try {
    const theaters = await Theater.find();
    res.status(200).json({theaters});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getTheaterById = async (req, res) => {
  try {
    const theaterId = req.params.id
    const theater = await Theater.findById(req.params.id);

    if (!theater) {
      return res.status(404).json({ message: 'Theater not found' });
    }

    res.status(200).json({theater});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const updateTheater = async (req, res) => {
  try {
    const { name, location, seatsAvailabe } = req.body;

    const updatedTheater = await Theater.findByIdAndUpdate(
      req.params.id,
      {
        name,
        location,
        seatsAvailabe,
      },
      { new: true }
    );

    if (!updatedTheater) {
      return res.status(404).json({ message: 'Theater not found' });
    }

    res.status(200).json({updatedTheater});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const deleteTheater = async (req, res) => {
  try {
    const deletedTheater = await Theater.findByIdAndDelete(req.params.id);

    if (!deletedTheater) {
      return res.status(404).json({ message: 'Theater not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {createTheater, getAllTheaters, getTheaterById, updateTheater, deleteTheater}