import express from 'express';
import { register, login, getMe } from '../controller/authController.js';
import { authenticateToken } from '../utils/middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticateToken, getMe);

export default router;