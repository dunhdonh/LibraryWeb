import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  image: { type: String },  // URL của ảnh bìa sách
  publisher: { type: String },
  year: { type: Number },
  stock: { type: Number, default: 0 },  // số lượng sách hiện có
  borrowCount: { type: Number, default: 0 }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

export default Book;
