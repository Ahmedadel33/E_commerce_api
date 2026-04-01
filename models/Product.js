const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true },
  price: { type: Number, required: [true, 'Price is required'], min: 0 },
  oldPrice: { type: Number, min: 0 ,},
  image: { type: String, required: [true, 'Image is required'] },
  sale: { type: Boolean, default: false },
  category: { type: String, required: [true, 'Category is required'], trim: true },
  description: { type: String, trim: true },
}, { timestamps: true });   ;

module.exports = mongoose.model('Product', productSchema);