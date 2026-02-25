import { Themes, Lessons } from "../model/Lesson.js";
import asyncHandler from "../utils/asyncHandler.js";

export const ThemesController = {
    getAllThemes: asyncHandler(async (req, res) => {
        try {
            const themes = await Themes.getAllThemes();
            res.status(200).json({ success: true, data: themes });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }),
    getThemesContent: asyncHandler(async (req, res) => {
        try {
            const themeId = req.params.id;
            if(!themeId){
                throw new ErrorResponse('Vui lòng cung cấp id của chủ đề', 400);
            }
            const themeData = await Themes.getContentByThemeId(themeId);
            if(!themeData){
                throw new ErrorResponse('Không tìm thấy chủ đề', 404);
            }
            res.status(200).json({ success: true, data: themeData });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }),
};

export const LessonsController = {
    getAllLessons: asyncHandler(async (req, res) => {
        try {
            const lessons = await Lessons.getAllLessons();
            res.status(200).json({ success: true, data: lessons });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }),
    getLessonsContent: asyncHandler(async (req, res) => {
        try {
            const lessonId = req.params.id;
            if(!lessonId){
                throw new ErrorResponse('Vui lòng cung cấp id của bài học', 400);
            }
            const lessonData = await Lessons.getContentByLessonId(lessonId);
            if(!lessonData){
                throw new ErrorResponse('Không tìm thấy bài học', 404);
            }
            res.status(200).json({ success: true, data: lessonData });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }),
};
