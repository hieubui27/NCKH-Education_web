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
              'content', l.content
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
    getVocabulariesByLessonId: async (lessonId) => {
        const query = `SELECT * FROM vocabularies WHERE lesson_id = $1`;
        const { rows } = await pool.query(query, [lessonId]);
        return rows;
    },
    
};
