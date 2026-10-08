const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide service title'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please provide service description'],
      trim: true
    },
    icon: {
      type: String,
      default: 'ShieldCheck'
    },
    features: [
      {
        type: String,
        trim: true
      }
    ],
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', ServiceSchema);
