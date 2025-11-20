const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ExcelFile = require('../models/ExcelFile');

// Middleware to check admin access
const isAdmin = async (req, res, next) => {
  // Replace with your actual auth logic
  const role = req.headers['role']; // Simplified, should be decoded from JWT in production
  if (role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  next();
};

// GET /api/admin/stats
router.get('/stats', isAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalUploads = await ExcelFile.countDocuments();
    res.json({ totalUsers, totalUploads });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});
// GET /api/admin/users
router.get('/users', isAdmin, async (req, res) => {
  try {
    const users = await User.find({}, '_id email role');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});
// DELETE /api/admin/user/:id
router.delete('/user/:id', isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;
