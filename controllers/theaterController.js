const Theater = require('../models/Theater');


exports.createTheater = async (req, res) => {
  try {
    const { name, location, capacity } = req.body;

    const newTheater = new Theater({
      name,
      location,
      capacity,
    });

    await newTheater.save();

    res.status(201).json(newTheater);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getAllTheaters = async (req, res) => {
  try {
    const theaters = await Theater.find();
    res.status(200).json(theaters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getTheaterById = async (req, res) => {
  try {
    const theater = await Theater.findById(req.params.id);

    if (!theater) {
      return res.status(404).json({ message: 'Theater not found' });
    }

    res.status(200).json(theater);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateTheater = async (req, res) => {
  try {
    const { name, location, capacity } = req.body;

    const updatedTheater = await Theater.findByIdAndUpdate(
      req.params.id,
      {
        name,
        location,
        capacity,
      },
      { new: true }
    );

    if (!updatedTheater) {
      return res.status(404).json({ message: 'Theater not found' });
    }

    res.status(200).json(updatedTheater);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.deleteTheater = async (req, res) => {
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