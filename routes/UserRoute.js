import express from 'express';
import UserController from '../controllers/UserController.js';
import { authMiddleware } from '../middleware/AuthMiddleware.js';
import { adminAuthMiddleware } from '../middleware/AdminAuthMiddleware.js';
const router = express.Router();

router.get('/get-all', authMiddleware, UserController.getAllUsers);
router.get('/:id', authMiddleware, UserController.getUserById);
router.get('/username/:username', authMiddleware, UserController.getUserByUsername);
router.post('/create', authMiddleware, UserController.createUser);
router.put('/:id', authMiddleware, UserController.updateUser);
router.delete('/:id', authMiddleware, adminAuthMiddleware, UserController.deleteUser);

export default router;
