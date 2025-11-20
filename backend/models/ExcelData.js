const mongoose = require('mongoose');

const excelDataSchema = new mongoose.Schema({
  rows: {
    type: [mongoose.Schema.Types.Mixed], // Accepts array of any shape
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ExcelData', excelDataSchema);
<<<<<<< HEAD
=======

>>>>>>> 5237fcee738710c1eff4153d50df0accd785fb62
