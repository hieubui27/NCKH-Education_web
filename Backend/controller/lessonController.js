import { Themes, Lessons, Vocabularies, SearchModel } from "../model/Lesson.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ErrorResponse } from "../utils/middleware.js"; 

//xu ly tim kiem
export const SearchController = {
    suggest: asyncHandler(async (req, res) => {
        const keyword = req.query.q; // Nhận từ khóa từ Frontend qua query string (VD: ?q=Mùa Xuân)

        // Nếu keyword rỗng, không cần query DB, trả về mảng rỗng ngay lập tức
        if (!keyword || keyword.trim() === "") {
            return res.status(200).json({
                success: true,
                data: { themes: [], lessons: [], words: [] }
            });
        }

        // Gọi DB để lấy dữ liệu
        const results = await SearchModel.liveSearchData(keyword.trim());

        // Trả kết quả thành công
        res.status(200).json({
            success: true,
            data: results
        });
    })
};

//xu ly chu de
export const ThemesController = {
    getAllThemes: asyncHandler(async (req, res) => {
        const themes = await Themes.getAllThemes();
        res.status(200).json({ success: true, data: themes });
    }),
    getThemesContent: asyncHandler(async (req, res) => {
        const themeId = req.params.themeId;
        if(!themeId){
            throw new ErrorResponse('Vui lòng cung cấp id của chủ đề', 400);
        }
        const themeData = await Themes.getContentByThemeId(themeId);
        if(!themeData){
            throw new ErrorResponse('Không tìm thấy chủ đề', 404);
        }
        res.status(200).json({ success: true, data: themeData });
    }),
};

//xu ly bai hoc
export const LessonsController = {
    getAllLessons: asyncHandler(async (req, res) => {
        const lessons = await Lessons.getAllLessons();
        res.status(200).json({ success: true, data: lessons });
    }),
    getLessonsContent: asyncHandler(async (req, res) => {
        const lessonId = req.params.lessonId;
        if(!lessonId){
            throw new ErrorResponse('Vui lòng cung cấp id của bài học', 400);
        }
        const lessonData = await Lessons.getContentByLessonId(lessonId);
        const wordsData = await Vocabularies.getWordsByLessonId(lessonId);
        if(!lessonData){
            throw new ErrorResponse('Không tìm thấy bài học', 404);
        }
        res.status(200).json({ success: true, data: {lessonData, wordsData} });
    }),
};

//xu ly tu vung
export const VocabulariesController = {
    getVocabulariesByWordId: asyncHandler(async (req, res) => {
        const wordId = req.params.wordId;
        if(!wordId){
            throw new ErrorResponse('Vui lòng cung cấp id của từ vựng', 400);
        }
        const vocabularies = await Vocabularies.getVocabulariesByWordId(wordId);
        if(vocabularies.length === 0){
            throw new ErrorResponse('Không tìm thấy từ vựng', 404);
        }
        res.status(200).json({ success: true, data: vocabularies });
    }),
};