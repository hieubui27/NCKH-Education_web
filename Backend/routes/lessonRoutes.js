import express from 'express';
import {ThemesController, LessonsController} from '../controller/lessonController.js';
import { authenticateToken } from '../utils/middleware.js';

const router = express.Router();

router.get('/themes', authenticateToken, ThemesController.getAllThemes);
router.get('/themes/:id', authenticateToken, ThemesController.getThemesContent);
router.get('/themes/:id/lesson/:id', authenticateToken, LessonsController.getLessonsContent);

export default router;