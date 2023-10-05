const mongoose = require('mongoose');

const IMACSchema = new mongoose.Schema({
  First_Name: {
     type: String,
    required: true
  },
  Last_Name: {
    type: String,
    required: true
  },
  Age: {
    type: String,
    required: true
  },
  Course: {
    type: String,
    required: true
  },
  Section: {
    type: String,
    required: true
  },
  
});

const IMAC = mongoose.model('IMAC', IMACSchema);
module.exports = IMAC