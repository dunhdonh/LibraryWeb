import BorrowingService from "../services/BorrowingService.js";

const getAllBorrowings = async (req, res) => {
    try {
        const result = await BorrowingService.getAllBorrowings();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getBorrowingById = async (req, res) => {
    const { id } = req.params;
    try {
        const borrowing = await BorrowingService.getBorrowingById(id);
        if (!borrowing) {
            return res.status(404).json({ message: "Borrowing not found" });
        }
        res.status(200).json(borrowing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createBorrowing = async (req, res) => {
    try {
        const newBorrowing = await BorrowingService.createBorrowing(req.body);
        res.status(201).json(newBorrowing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateBorrowing = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedBorrowing = await BorrowingService.updateBorrowing(id, updateData);
        res.status(200).json(updatedBorrowing);
    } catch (error) {
        const status = error.message === "Invalid borrowing ID" ? 400 :
                       error.message === "Borrowing not found" ? 404 : 500;
        res.status(status).json({ message: error.message });
    }
};

const deleteBorrowing = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await BorrowingService.deleteBorrowing(id);
        res.status(200).json(result);
    } catch (error) {
        const status = error.message === "Invalid borrowing ID" ? 400 :
                       error.message === "Borrowing not found" ? 404 : 500;
        res.status(status).json({ message: error.message });
    }
};

const getBorrowingsByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const borrowings = await BorrowingService.getBorrowingsByUserId(userId);
        res.status(200).json(borrowings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getBorrowingsByBookId = async (req, res) => {
    const { bookId } = req.params;

    try {
        const borrowings = await BorrowingService.getBorrowingsByBookId(bookId);
        res.status(200).json(borrowings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
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
