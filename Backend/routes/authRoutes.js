import express from 'express';
import { register, login, logout, getMe, updateInfo } from '../controller/authController.js';
import { authenticateToken } from '../utils/middleware.js';

const router = express.Router();

router.post('/register', register); // đăng ký tài khoản
router.post('/login', login); // đăng nhập tài khoản
router.post('/logout', logout); // đăng xuất tài khoản
router.get('/me', authenticateToken, getMe);// lấy thông tin cá nhân của user
router.put('/me', authenticateToken, updateInfo);// cập nhật thông tin cá nhân của user

export default router;