const User = require('../models/user');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const saved = await user.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all users (exclude soft-deleted)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: false });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single user by id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.isDeleted) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated || updated.isDeleted) return res.status(404).json({ error: 'User not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Soft-delete user
exports.softDeleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.isDeleted) return res.status(404).json({ error: 'User not found' });
    user.isDeleted = true;
    await user.save();
    res.json({ message: 'User soft-deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Enable user by email and username
exports.enableUser = async (req, res) => {
  const { email, username } = req.body;
  if (!email || !username) return res.status(400).json({ error: 'Must provide email and username' });
  try {
    const user = await User.findOne({ email, username, isDeleted: false });
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.status = true;
    await user.save();
    res.json({ message: 'User enabled', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Disable user by email and username
exports.disableUser = async (req, res) => {
  const { email, username } = req.body;
  if (!email || !username) return res.status(400).json({ error: 'Must provide email and username' });
  try {
    const user = await User.findOne({ email, username, isDeleted: false });
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.status = false;
    await user.save();
    res.json({ message: 'User disabled', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};