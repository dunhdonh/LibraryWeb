import Book from "../models/Book.js";
import Category from "../models/Category.js";
import Borrowing from "../models/Borrowing.js";
import mongoose from "mongoose";


const getAllBooks = async ({ category, search }) => {
    const filter = {};

    if (category) {
        filter.category = category;
    }

    if (search) {
        filter.title = { $regex: search, $options: 'i' }; // Tìm theo tên (không phân biệt hoa thường)
    }

    const books = await Book.find(filter).populate("category");
    const totalBooks = await Book.countDocuments(filter); // Đếm theo bộ lọc

    return {
        books,
        totalBooks
    };
};


const getBookById = async (id) => {
    return await Book.findById(id).populate("category");
}

const getBooksByTitle = async (title) => {
    return Book.find({
        title: { $regex: title, $options: 'i' } // Tìm kiếm không phân biệt hoa thường
    }).limit(5);
};

const createBook = async (bookData) => {
    const { title, author, categoryName, stock, image, publisher, year, summary } = bookData;
    if (!title || !author || !categoryName || !image) {
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
        image: image || "", // Default to empty string if not provided
        publisher: publisher || "",
        year: year || new Date().getFullYear(), // Default to current year if not provided
        summary: summary || ""
    });

    return await newBook.save();
};

const updateBook = async (id, updateData) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid book ID");
    }

    // Nếu có categoryName, tìm category tương ứng và gán _id
    if (updateData.categoryName) {
        const category = await Category.findOne({ name: updateData.categoryName });
        if (!category) {
            throw new Error("Category not found");
        }
        updateData.category = category._id; // gán _id vào trường category
        delete updateData.categoryName; // xóa categoryName để tránh lưu dư thừa
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

    await Borrowing.updateMany({ bookId: deletedBook._id }, { $unset: { bookId: "" } });

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
    getBooksByTitle,
    createBook,
    updateBook,
    deleteBook,
    getBooksByCategory
};

