import pool from "../config/db.js";

export const Themes = {
    getAllThemes: async () => {
        const query = `SELECT * FROM themes 
                        ORDER BY id ASC`;
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
                ) ORDER BY l.id ASC
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
        const query = `
            SELECT id, week_id, title, content, order_number, image_url, created_at
            FROM lessons
            WHERE id = $1
            LIMIT 1
        `;
        const { rows } = await pool.query(query, [lessonId]);
        return rows[0] || null;
    },
};

export const Vocabularies = {
    getVocabulariesByWordId: async (wordId) => {
        const query = `
            SELECT
                v.id,
                v.word,
                v.pos,
                v.standard_meaning,
                v.simplified_meaning,
                v.image_url,
                v.audio_url,
                v.video_url,
                v.nuance,
                COALESCE(v.synonyms, '{}'::text[]) AS synonyms,
                COALESCE(v.antonyms, '{}'::text[]) AS antonyms,
                v.is_required,
                v.notes,
                v.created_at,
                -- Lấy danh sách ngữ cảnh (Bối cảnh phù hợp/không phù hợp)
                COALESCE(
                    (SELECT json_agg(json_build_object(
                        'id', vc.id,
                        'content', vc.content,
                        'is_appropriate', vc.is_appropriate,
                        'explanation', vc.explanation,
                        'image_url', vc.image_url
                    )) FROM vocabulary_contexts vc WHERE vc.vocab_id = v.id),
                    '[]'
                ) AS contexts,
                -- Lấy danh sách câu ví dụ (Sử dụng từ trong câu)
                COALESCE(
                    (SELECT json_agg(json_build_object(
                        'id', vs.id,
                        'sentence', vs.sentence
                    )) FROM vocabulary_sentences vs WHERE vs.vocab_id = v.id),
                    '[]'
                ) AS sentences,
                -- Lấy danh sách bài tập liên quan
                COALESCE(
                    (SELECT json_agg(json_build_object(
                        'id', ve.id,
                        'title', ve.title,
                        'quiz_url', ve.quiz_url
                    )) FROM vocabulary_exercises ve WHERE ve.vocab_id = v.id),
                    '[]'
                ) AS exercises
            FROM vocabularies v
            WHERE v.id = $1
            LIMIT 1
        `;
        const { rows } = await pool.query(query, [wordId]);
        return rows[0] || null;
    },

    getWordsByLessonId: async (lessonId) => {
        const query = `
            SELECT v.id, v.word, v.image_url, v.pos
            FROM lesson_vocabularies lv
            JOIN vocabularies v ON v.id = lv.vocab_id
            WHERE lv.lesson_id = $1
            ORDER BY v.word ASC
        `;
        const { rows } = await pool.query(query, [lessonId]);
        return rows;
    },
};
//xu ly tim kiem bản only search
export const SearchModel = {
    liveSearchData: async (keyword) => {
        const searchParam = `%${keyword}%`;

        // 1. SEARCH LESSON (kèm theme)
        const lessonQuery = `
            SELECT 
                l.id,
                l.title,
                l.content,
                w.id AS week_id,
                t.id AS theme_id,
                t.title AS theme_name
            FROM lessons l
            LEFT JOIN weeks w ON w.id = l.week_id
            LEFT JOIN themes t ON t.id = w.theme_id
            WHERE l.title ILIKE $1 OR l.content ILIKE $1
            ORDER BY l.id DESC
            LIMIT 5;
        `;

        // 2. SEARCH THEME (kèm lesson count)
        const themeQuery = `
            SELECT 
                t.id,
                t.title AS theme_name,
                COUNT(l.id) AS total_lessons
            FROM themes t
            LEFT JOIN weeks w ON w.theme_id = t.id
            LEFT JOIN lessons l ON l.week_id = w.id
            WHERE t.title ILIKE $1
            GROUP BY t.id
            ORDER BY t.id DESC
            LIMIT 5;
        `;

        // 3. SEARCH WORD (kèm lesson + theme liên quan)
        const wordQuery = `
            SELECT 
                v.id,
                v.word,
                json_agg(
                    DISTINCT jsonb_build_object(
                        'lesson_id', l.id,
                        'lesson_title', l.title,
                        'theme_id', t.id,
                        'theme_name', t.title
                    )
                ) FILTER (WHERE l.id IS NOT NULL) AS relations
            FROM vocabularies v
            LEFT JOIN lesson_vocabularies lv ON lv.vocab_id = v.id
            LEFT JOIN lessons l ON l.id = lv.lesson_id
            LEFT JOIN weeks w ON w.id = l.week_id
            LEFT JOIN themes t ON t.id = w.theme_id
            WHERE v.word ILIKE $1
            GROUP BY v.id
            ORDER BY v.word ASC
            LIMIT 5;
        `;

        const [lessonResult, themeResult, wordResult] = await Promise.all([
            pool.query(lessonQuery, [searchParam]),
            pool.query(themeQuery, [searchParam]),
            pool.query(wordQuery, [searchParam])
        ]);

        // 👉 xử lý author từ content
        const processedLessons = lessonResult.rows.map(lesson => {
            const authorMatch = lesson.content?.match(/\(?Theo\s+(.+?)\)?$/i);

            return {
                id: lesson.id,
                title: lesson.title,
                author: authorMatch ? authorMatch[1].trim() : "Chưa rõ",
                theme_id: lesson.theme_id,
                theme_name: lesson.theme_name
            };
        });

        return {
            themes: themeResult.rows,
            lessons: processedLessons,
            words: wordResult.rows
        };
    }
};