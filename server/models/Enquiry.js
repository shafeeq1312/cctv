const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide customer name'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Please provide phone number'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide email address'],
      trim: true,
      lowercase: true
    },
    product: {
      type: String,
      default: 'General Enquiry',
      trim: true
    },
    message: {
      type: String,
      required: [true, 'Please provide enquiry details'],
      trim: true
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'resolved'],
      default: 'new'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Enquiry', EnquirySchema);
