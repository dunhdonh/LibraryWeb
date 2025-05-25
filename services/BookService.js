import Book from "../models/Book.js";
import Category from "../models/Category.js";
import Borrowing from "../models/Borrowing.js";
import mongoose from "mongoose";


const getAllBooks = async () => {
    return await Book.find().populate("category");
    }

const getBookById = async (id) => {
      return await Book.findById(id).populate("category");
}

const createBook = async (bookData) => {
    const { title, author, categoryName,stock, imageUrl } = bookData;
    if (!title || !author || !categoryName || !imageUrl) {
        throw new Error("All fields are required");
    }

    const category = await Category.findOne({ name: categoryName });
    if (!category) {
        throw new Error("Category not found");
    }

    const newBook = new Book({
        title: title,
        author: author,
        category: category._id, 
        stock: stock || 0, // Default to 0 if not provided
        image: imageUrl || "", // Default to empty string if not provided
    });

    return await newBook.save();
};

const updateBook = async (id, updateData) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid book ID");
    }

    const updatedBook = await Book.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    );

    if (!updatedBook) {
        throw new Error("Book not found");
    }

    return updatedBook;
};


const deleteBook = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid book ID");
    }

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
        throw new Error("Book not found");
    }

    await Borrowing.updateMany({ bookId: book._id }, { $unset: { bookId: "" } });

    return { message: "Book deleted successfully" };
};

const getBooksByCategory = async (categoryId) => {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        throw new Error("Invalid category ID");
    }

    const category = await Category.findById(categoryId);
    if (!category) {
        throw new Error("Category not found");
    }

    const books = await Book.find({ category: categoryId }).populate("category");
    return books;
};


export default {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    getBooksByCategory
};

