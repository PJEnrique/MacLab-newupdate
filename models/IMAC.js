const mongoose = require('mongoose');

const IMACSchema = new mongoose.Schema({
  id: {
    type: String, // Assuming the ID is a string
    required: true
  },
  active: {
    type: Boolean,
    default: true // Adjust the default value if needed
  },
  timer: {
    type: Number,
    default: 7200
  },
});

const IMAC = mongoose.model('IMAC', IMACSchema);
module.exports = IMAC;