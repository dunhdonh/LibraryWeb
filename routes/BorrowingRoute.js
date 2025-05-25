import express from 'express';
import BorrowingController from '../controllers/BorrowingController.js';
import { authMiddleware } from '../middleware/AuthMiddleware.js';
import { adminAuthMiddleware } from '../middleware/AdminAuthMiddleware.js';

const router = express.Router();
router.get('/get-all', authMiddleware, adminAuthMiddleware, BorrowingController.getAllBorrowings);
router.get('/:id', authMiddleware, BorrowingController.getBorrowingById);
router.post('/create', authMiddleware, BorrowingController.createBorrowing);
router.put('/:id', authMiddleware, BorrowingController.updateBorrowing);
router.delete('/:id', authMiddleware, BorrowingController.deleteBorrowing);
router.get('/user/:userId', authMiddleware, BorrowingController.getBorrowingsByUserId);
router.get('/book/:bookId', authMiddleware, BorrowingController.getBorrowingsByBookId);
export default router;