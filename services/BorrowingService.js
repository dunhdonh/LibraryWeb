import Borrowing from '../models/Borrowing.js';
import mongoose from 'mongoose';
import Book from '../models/Book.js';
import User from '../models/User.js';

const getAllBorrowings = async () => {
    return await Borrowing.find()
        .populate('bookId', 'title author')
        .populate('userId', 'name email');
}

const getBorrowingById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid borrowing ID');
    }
    return await Borrowing.findById(id)
        .populate('bookId', 'title author')
        .populate('userId', 'name email');
}

const createBorrowing = async (borrowingData) => {
    const { bookId, userId, borrowDate, returnDate, status } = borrowingData;
    if (!bookId || !userId || !status) {
        throw new Error('All fields are required');
    }

    const book = await Book.findById(bookId);
    if (!book) {
        throw new Error('Book not found');
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const newBorrowing = new Borrowing({
        bookId,
        userId,
        borrowDate,
        returnDate,
        status
    });

    await Book.findByIdAndUpdate(bookId, { $inc: { borrowCount: 1 } });
    await User.findByIdAndUpdate(userId, { $inc: { borrowingCount: 1 } });
    return await newBorrowing.save();
};

const updateBorrowing = async (id, updateData) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid borrowing ID');
    }

    const updatedBorrowing = await Borrowing.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    )
    .populate('bookId', 'title author')
    .populate('userId', 'name email');

    if (!updatedBorrowing) {
        throw new Error('Borrowing not found');
    }

    return updatedBorrowing;
}

const deleteBorrowing = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid borrowing ID');
    }

    const deletedBorrowing = await Borrowing.findByIdAndDelete(id);

    if (!deletedBorrowing) {
        throw new Error('Borrowing not found');
    }

    return { message: 'Borrowing deleted successfully' };
}

const getBorrowingsByUserId = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid user ID');
    }

    const borrowings = await Borrowing.find({ userId: userId })
        .populate('bookId', 'title author')

    if (borrowings.length === 0) {
        throw new Error('No borrowings found for this user');
    }

    return borrowings;
}

const getBorrowingsByBookId = async (bookId) => {
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        throw new Error('Invalid book ID');
    }

    const borrowings = await Borrowing.find({ bookId: bookId })
        .populate('userId', 'name email');

    if (borrowings.length === 0) {
        throw new Error('No borrowings found for this book');
    }

    return borrowings;
}

export default {
    getAllBorrowings,
    getBorrowingById,
    createBorrowing,
    updateBorrowing,
    deleteBorrowing,
    getBorrowingsByUserId,
    getBorrowingsByBookId
};

