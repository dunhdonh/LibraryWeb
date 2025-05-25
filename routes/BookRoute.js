import express from 'express';
import BookController from '../controllers/BookController.js';
import { authMiddleware } from '../middleware/AuthMiddleware.js';       
import { adminAuthMiddleware } from '../middleware/AdminAuthMiddleware.js';
const router = express.Router();

router.get('/get-all', BookController.getAllBooks);
router.get('/:id', BookController.getBookById);
router.post('/create', authMiddleware, adminAuthMiddleware, BookController.createBook);
router.put('/:id', authMiddleware, adminAuthMiddleware, BookController.updateBook);
router.delete('/:id', authMiddleware, adminAuthMiddleware, BookController.deleteBook);
router.get('/category/:categoryId', BookController.getBooksByCategory);

export default router;

