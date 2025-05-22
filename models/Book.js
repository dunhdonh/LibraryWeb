const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  image: { type: String },  // URL của ảnh bìa sách
  publisher: { type: String },
  year: { type: Number },
  stock: { type: Number, default: 0 },  // số lượng sách hiện có
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
