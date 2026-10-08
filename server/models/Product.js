const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide product name'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Please select category'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Please specify price'],
      min: 0
    },
    description: {
      type: String,
      required: [true, 'Please provide product description']
    },
    specifications: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=600&q=80'
    },
    stock: {
      type: Number,
      default: 10,
      min: 0
    },
    warranty: {
      type: String,
      default: '1 Year'
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
