import express from 'express';
import {ThemesController, LessonsController, VocabulariesController} from '../controller/lessonController.js';
import { authenticateToken } from '../utils/middleware.js';

const router = express.Router();

router.get('/', authenticateToken, ThemesController.getAllThemes); // tra ve danh sach cac chu de
router.get('/:themeId', authenticateToken, ThemesController.getThemesContent); // tra ve noi dung cua 1 chu de(gom co thong tin chu de va thong tin cac bai hoc)
router.get('/:themeId/:lessonId', authenticateToken, LessonsController.getLessonsContent); // tra ve noi dung cua 1 bai hoc(doan van)
router.get('/:themeId/:lessonId/vocabularies', authenticateToken, VocabulariesController.getVocabulariesByLessonId); // tra ve danh sach tu vung cua 1 bai hoc

export default router;