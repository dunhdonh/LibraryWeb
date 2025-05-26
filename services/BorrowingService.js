import Borrowing from '../models/Borrowing.js';
import mongoose from 'mongoose';
import Book from '../models/Book.js';
import User from '../models/User.js';

const getAllBorrowings = async () => {
    const borrowings = await Borrowing.find()
        .populate('bookId', 'title author')
        .populate('userId', 'name email');
    const totalBorrowings = await Borrowing.countDocuments();
    return {
        borrowings: borrowings,
        totalBorrowings: totalBorrowings
    };
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
    const { bookId, userId, borrowDate, dueDate, status } = borrowingData;
    if (!bookId || !userId || !status) {
        throw new Error('All fields are required');
    }

    const book = await Book.findById(bookId);
    if (!book) {
        throw new Error('Book not found');
    }

    if (book.stock < 1) {
        throw new Error("Book is out of stock");
    }
    const user = await User.findById(userId);

    if (!user) {
        throw new Error('User not found');
    }

    book.stock -= 1;
    await book.save();

    const newBorrowing = new Borrowing({
        bookId,
        userId,
        borrowDate,
        dueDate,
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

    // Lấy bản ghi borrowing cũ
    const borrowing = await Borrowing.findById(id);
    if (!borrowing) {
        throw new Error('Borrowing not found');
    }

    // Nếu status được cập nhật thành "returned" và trước đó không phải là "returned"
    if (updateData.status === 'returned' && borrowing.status !== 'returned') {
        const book = await Book.findById(borrowing.bookId);
        if (book) {
            book.stock += 1;
            await book.save();
        }
        updateData.returnDate = new Date(); // tự động set ngày trả
    }

    const updatedBorrowing = await Borrowing.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    )
        .populate('bookId', 'title author')
        .populate('userId', 'name email');

    return updatedBorrowing;
};


const deleteBorrowing = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid borrowing ID');
    }

    // Tìm borrowing trước khi xoá để lấy bookId và userId
    const borrowing = await Borrowing.findById(id);
    if (!borrowing) {
        throw new Error('Borrowing not found');
    }


    // Nếu borrowing đã được trả, không cần cập nhật gì thêm
    if (borrowing.status === 'returned') {
        return { message: 'Borrowing already returned, no further action needed' };
    }
    else {
        // Cập nhật book.stock tăng 1
        await Book.findByIdAndUpdate(borrowing.bookId, { $inc: { stock: 1 } });

        // Cập nhật user.borrowingCount giảm 1
        const user = await User.findById(borrowing.userId);
        if (user && user.borrowingCount > 0) {
            await User.findByIdAndUpdate(borrowing.userId, {
                $inc: { borrowingCount: -1 }
            });
        }
    }

    // Xoá borrowing
    await Borrowing.findByIdAndDelete(id);

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

