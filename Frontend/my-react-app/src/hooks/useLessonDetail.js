import { useState, useEffect } from 'react';
import { lessonApi } from '../api/lessonApi';
import { message } from 'antd';

export const useLessonDetail = (topicId, lessonId) => {
    const [loading, setLoading] = useState(true);
    const [lesson, setLesson] = useState(null);
    const [words, setWords] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLessonDetail = async () => {
            if (!topicId || !lessonId) return;

            try {
                setLoading(true);
                setError(null);

                const data = await lessonApi.getLessonDetail(topicId, lessonId);

                // Bóc tách dữ liệu
                const lessonDataRaw = data.data?.lessonData;
                const wordsDataRaw = data.data?.wordsData || [];

                const mainLesson =
                    Array.isArray(lessonDataRaw) && lessonDataRaw.length > 0
                        ? lessonDataRaw[0]
                        : lessonDataRaw || null;

                setLesson(mainLesson);
                setWords(wordsDataRaw);
            } catch (err) {
                console.error('Lỗi tải bài học:', err);
                setError(err.message || 'Có lỗi xảy ra khi tải bài học');
                message.error(err.message || 'Có lỗi xảy ra khi tải bài học');
            } finally {
                setLoading(false);
            }
        };

        fetchLessonDetail();
    }, [topicId, lessonId]);

    return {
        lesson,
        words,
        loading,
        error,
    };
};
