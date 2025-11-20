const express = require('express');
const router = express.Router();
const ExcelFile = require('../models/ExcelFile');

// GET /api/excel/history/:userId
router.get('/history/:userId', async (req, res) => {
  try {
    const files = await ExcelFile.find({ userId: req.params.userId }).sort({ uploadedAt: -1 });
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch upload history' });
  }
});

module.exports = router;
