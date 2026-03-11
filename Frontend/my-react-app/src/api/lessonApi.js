import http from '../utils/http';

export const lessonApi = {
    /**
     * Lấy chi tiết bài học và danh sách từ vựng highlight
     */
    getLessonDetail: (topicId, lessonId) => {
        return http(`/api/lessons/${topicId}/${lessonId}`, {
            method: 'GET',
        });
    },

    /**
     * (Ví dụ thôi, có thể thêm getAllLessons hoặc getLessonsByTopicId)
     */
    getLessonsByTopic: (topicId) => {
        return http(`/api/topics/${topicId}/lessons`, {
            method: 'GET',
        });
    }
};
