import User from '../models/User.js';

export const addUsers = async (req, res) => {
  try {
    const users = req.body;
    const createdUsers = await User.insertMany(users);
    res.status(201).json(createdUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};