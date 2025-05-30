import BookService from '../services/BookService.js';

const getAllBooks = async (req, res) => {
    try {
        const { search, category } = req.query;
        const result = await BookService.getAllBooks({ search, category });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await BookService.getBookById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getBooksByTitle = async (req, res) => {
    const { title } = req.params;
    try {
        const books = await BookService.getBooksByTitle(title);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createBook = async (req, res) => {
    try {
        const newBook = await BookService.createBook(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateBook = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedBook = await BookService.updateBook(id, updateData);
        res.status(200).json(updatedBook);
    } catch (error) {
        const status = error.message === "Invalid book ID" ? 400 :
                       error.message === "Book not found" ? 404 : 500;
        res.status(status).json({ message: error.message });
    }
};


const deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await BookService.deleteBook(id);
        res.status(200).json(result);
    } catch (error) {
        const status = error.message === "Invalid book ID" ? 400 :
                       error.message === "Book not found" ? 404 : 500;
        res.status(status).json({ message: error.message });
    }
};

const getBooksByCategory = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const books = await BookService.getBooksByCategory(categoryId);
        res.status(200).json(books);
    } catch (error) {
        const status = error.message === "Invalid category ID" ? 400 :
                       error.message === "Category not found" ? 404 : 500;
        res.status(status).json({ message: error.message });
    }
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

