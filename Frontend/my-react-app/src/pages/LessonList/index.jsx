import React, { useState, useEffect } from 'react';
import { message, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import bannerImage from '../../assets/Group 1.png';

const LessonList = () => {
  const navigate = useNavigate();
  const { classId, termId, topicId } = useParams();

  const [weeks, setWeeks] = useState([]); // Lưu nguyên cấu trúc theo tuần
  const [loading, setLoading] = useState(true);

  const DEFAULT_LESSON_IMAGE = 'https://via.placeholder.com/300x200?text=No+Image';

  useEffect(() => {
    const fetchThemeContents = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const res = await fetch(`/api/lessons/${topicId || '1'}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        const data = await res.json();
        if (data.success && data.data) {
          // Giữ nguyên cấu trúc phân cấp tuần từ API
          setWeeks(data.data);
        } else {
          message.error(data.message || 'Lấy danh sách bài học thất bại');
        }
      } catch (error) {
        console.error('Lỗi khi tải bài học:', error);
        message.error('Có lỗi xảy ra khi kết nối máy chủ');
      } finally {
        setLoading(false);
      }
    };

    fetchThemeContents();
  }, [topicId]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-[#FEFBF4] pt-2 pb-14 px-4">
      {/* Banner */}
      <div className="w-full max-w-4xl mb-6 mt-2">
        <img
          src={bannerImage}
          alt="Banner Cùng nhau tập đọc"
          className="w-full h-auto object-contain rounded-2xl"
        />
      </div>

      {loading ? (
        <div className="flex-1 flex justify-center items-center py-20">
          <Spin size="large" />
        </div>
      ) : weeks.length === 0 ? (
        <div className="text-gray-500 font-bold py-20">
          Không có bài học nào trong chủ đề này.
        </div>
      ) : (
        <div className="w-full max-w-4xl flex flex-col gap-10">
          {weeks.map((week, weekIdx) => (
            <div key={week.id || weekIdx} className="flex flex-col items-center">
              {/* Tiêu đề Tuần (Ví dụ: Tuần 1) */}
              <h2 className="text-[#DE5E51] text-3xl font-bold mb-6 italic">
                {week.title || `Tuần ${weekIdx + 1}`}
              </h2>

              {/* Grid danh sách bài học của tuần đó */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {week.lessons && week.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex flex-col items-center cursor-pointer transition-transform hover:scale-[1.02]"
                    onClick={() =>
                      navigate(
                        `/danh-sach-lop/${classId || 'lop-2'}/ky/${termId || '1'}/chu-de/${topicId || '1'}/bai-hoc/${lesson.id}`
                      )
                    }
                  >
                    {/* Khung ảnh bài học */}
                    <div className="w-full aspect-[16/10] mb-3 overflow-hidden rounded-xl shadow-sm border-4 border-transparent hover:border-orange-200 bg-white">
                      <img
                        src={lesson.image_url || DEFAULT_LESSON_IMAGE}
                        alt={lesson.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = DEFAULT_LESSON_IMAGE;
                        }}
                      />
                    </div>
                    {/* Tiêu đề bài học */}
                    <h3 className="text-black font-bold text-xl text-center uppercase">
                      {lesson.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LessonList;