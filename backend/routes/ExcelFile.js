const mongoose = require('mongoose');

const ExcelFileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filename: String,
  data: Array,
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ExcelFile', ExcelFileSchema);
