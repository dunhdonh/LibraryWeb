import express from 'express';
import AuthController from '../controllers/AuthController.js';

const router = express.Router();
// Đăng ký người dùng mới
router.post('/register', AuthController.register);
// Đăng nhập người dùng
router.post('/login', AuthController.login);
// Đăng xuất người dùng
router.post('/logout', AuthController.logout);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/verify-otp', AuthController.verifyOtp);
router.post('/reset-password', AuthController.resetPassword);
router.post('/refresh-token', AuthController.refreshToken);
export default router;