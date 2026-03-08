import pool from "../config/db.js";

export const Themes = {
    getAllThemes: async () => {
        const query = `SELECT * FROM themes`;
        const { rows } = await pool.query(query);
        return rows;
    },
    getContentByThemeId: async (themeId) => {
        const query = `
          SELECT 
            w.id AS week_id,
            w.week_number,
            w.title AS week_title,
            COALESCE(
              json_agg(
                json_build_object(
                  'id', l.id, 
                  'title', l.title, 
                  'order_number', l.order_number,
                  'content', l.content,
                  'image_url', l.image_url -- Thêm dòng này
                ) ORDER BY l.order_number ASC
              ) FILTER (WHERE l.id IS NOT NULL), 
              '[]'
            ) AS lessons
          FROM weeks w
          LEFT JOIN lessons l ON w.id = l.week_id
          WHERE w.theme_id = $1
          GROUP BY w.id, w.week_number, w.title
          ORDER BY w.week_number ASC;
        `;
        const { rows } = await pool.query(query, [themeId]);
        return rows;
    },
};

export const Weeks = {
    getAllWeeks: async () => {
        const query = `SELECT * FROM weeks`;
        const { rows } = await pool.query(query);
        return rows;
    },
    getWeeksByThemeId: async (themeId) => {
        const query = `SELECT * FROM weeks WHERE theme_id = $1`;
        const { rows } = await pool.query(query, [themeId]);
        return rows;
    },
};

export const Lessons = {
    getAllLessons: async () => {
        const query = `SELECT * FROM lessons`;
        const { rows } = await pool.query(query);
        return rows;
    },
    getContentByLessonId: async (lessonId) => {
        const query = `SELECT content FROM lessons WHERE id = $1`;
        const { rows } = await pool.query(query, [lessonId]);
        return rows;
    },
};

export const Vocabularies = {
    getVocabulariesByWordId: async (wordId) => {
        const query = `SELECT * FROM vocabularies WHERE id = $1`;
        const { rows } = await pool.query(query, [wordId]);
        return rows;
    },
    getWordsByLessonId: async (lessonId) => {
        const query = `SELECT id, word FROM vocabularies WHERE lesson_id = $1`;
        const { rows } = await pool.query(query, [lessonId]);
        return rows;
    },
};

//xu ly tim kiem bản only search
export const SearchModel = {
    liveSearchData: async (keyword) => {
        const searchParam = `%${keyword}%`;

        // 1. DỌN DẸP LẠI: Chỉ lấy id, title, và content (để lọc tác giả)
        // Bỏ hẳn phần join với bảng vocabularies
        const lessonQuery = `
            SELECT id, title, content
            FROM lessons
            WHERE title ILIKE $1 OR content ILIKE $1
            LIMIT 5;
        `;

        // 2. DỌN DẸP LẠI: Chỉ lấy id và tên chủ đề
        // Bỏ hẳn phần join với bảng weeks và lessons
        const themeQuery = `
            SELECT id, title as theme_name
            FROM themes
            WHERE title ILIKE $1
            LIMIT 5;
        `;

        const wordQuery = `
            SELECT id, word
            FROM vocabularies
            WHERE word ILIKE $1
            LIMIT 5;
        `;

        const [lessonResult, themeResult, wordResult] = await Promise.all([
            pool.query(lessonQuery, [searchParam]),
            pool.query(themeQuery, [searchParam]),
            pool.query(wordQuery, [searchParam])
        ]);

        // Xử lý tách tên tác giả
        const processedLessons = lessonResult.rows.map(lesson => {
            const authorMatch = lesson.content.match(/\(?Theo\s+(.+?)\)?$/i); 
            
            return {
                id: lesson.id,
                title: lesson.title,
                author: authorMatch ? authorMatch[1].trim() : "Chưa rõ"
                // Mình không trả về 'content' nữa cho JSON nhẹ bớt, vì dropdown ko cần in ra bài văn dài
            };
        });

        return {
            themes: themeResult.rows,     // Trả về [{id: 1, theme_name: "..."}]
            lessons: processedLessons,     // Trả về [{id: 1, title: "...", author: "..."}]
            words: wordResult.rows
        };
    }
};