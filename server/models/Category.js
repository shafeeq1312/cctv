const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please specify category name'],
      unique: true,
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'Camera'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', CategorySchema);
