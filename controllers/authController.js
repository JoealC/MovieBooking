const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Admin');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');
dotenv.config()


exports.register = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const existingUser = await Admin.findOne({ username });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  
  exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
   
      const user = await Admin.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: '1h', 
      });
  
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };