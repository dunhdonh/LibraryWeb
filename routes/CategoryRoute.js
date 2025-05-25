import express from 'express';
import CategoryController from '../controllers/CategoryController.js';
import { authMiddleware } from '../middleware/AuthMiddleware.js';       
import { adminAuthMiddleware } from '../middleware/AdminAuthMiddleware.js';
const router = express.Router();

router.get('/get-all', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategoryById);
router.post('/create', authMiddleware, adminAuthMiddleware, CategoryController.createCategory);
router.put('/:id', authMiddleware, adminAuthMiddleware, CategoryController.updateCategory);
router.delete('/:id', authMiddleware, adminAuthMiddleware, CategoryController.deleteCategory);

export default router;
