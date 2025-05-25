import express from 'express';
import UserController from '../controllers/UserController.js';
import { authMiddleware } from '../middleware/AuthMiddleware.js';
import { adminAuthMiddleware } from '../middleware/AdminAuthMiddleware.js';
const router = express.Router();

router.get('/get-all', authMiddleware, adminAuthMiddleware, UserController.getAllUsers);
router.get('/:id', authMiddleware, adminAuthMiddleware, UserController.getUserById);
router.post('/create', authMiddleware, adminAuthMiddleware, UserController.createUser);
router.put('/:id', authMiddleware, adminAuthMiddleware, UserController.updateUser);
router.delete('/:id', authMiddleware, adminAuthMiddleware, UserController.deleteUser);

export default router;
