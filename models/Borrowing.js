import mongoose from 'mongoose';

const borrowingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  borrowDate: { type: Date, default: Date.now },
  dueDate: {
    type: Date,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    required: true
  },
  returnDate: { type: Date },
  status: { type: String, enum: ['reserved', 'borrowed', 'returned', 'late'], default: 'borrowed' },
}, { timestamps: true });

const Borrowing = mongoose.model('Borrowing', borrowingSchema);
export default Borrowing;