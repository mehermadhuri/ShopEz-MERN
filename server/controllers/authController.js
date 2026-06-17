const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// In-memory user store if MongoDB is offline
const mockUsers = [];

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'shopez_secret_key_2024', { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ message: 'User already exists' });
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
      res.status(201).json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) });
    } else {
      console.log("Database offline: Utilizing in-memory user registry");
      const exists = mockUsers.find(u => u.email === email);
      if (exists) return res.status(400).json({ message: 'User already exists' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const mockUser = {
        _id: `mock_${Date.now()}`,
        name,
        email,
        password: hashedPassword
      };
      mockUsers.push(mockUser);
      res.status(201).json({ _id: mockUser._id, name: mockUser.name, email: mockUser.email, token: generateToken(mockUser._id) });
    }
  } catch (error) {
    console.error("Registration failed:", error);
    res.status(500).json({ message: error.message || 'Internal server error during registration' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      const user = await User.findOne({ email });
      if (user && await bcrypt.compare(password, user.password)) {
        res.json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      console.log("Database offline: Validating against in-memory user registry");
      const user = mockUsers.find(u => u.email === email);
      if (user && await bcrypt.compare(password, user.password)) {
        res.json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    }
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ message: error.message || 'Internal server error during login' });
  }
};

module.exports = { registerUser, loginUser };