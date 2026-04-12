import React, { useState, useEffect } from 'react';
import { message, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import bannerImage from '../../assets/Group 1.png';

const LessonList = () => {
  const navigate = useNavigate();
  const { classId, termId, topicId } = useParams();

  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ảnh mặc định nếu image_url từ API bị trống hoặc lỗi
  const DEFAULT_LESSON_IMAGE = 'https://via.placeholder.com/400x225?text=Tieng+Viet+2';

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

        const result = await res.json();
        
        if (result.success && result.data) {
          // Lưu trực tiếp mảng các tuần vào state
          setWeeks(result.data);
        } else {
          message.error(result.message || 'Lấy danh sách bài học thất bại');
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
    <div className="w-full min-h-screen flex flex-col items-center bg-[#FEFBF4] pt-4 pb-20 px-4">
      {/* 1. Phần Banner đầu trang */}
      <div className="w-full max-w-4xl mb-8">
        <img
          src={bannerImage}
          alt="Banner"
          className="w-full h-auto object-contain rounded-2xl shadow-sm"
        />
      </div>

      {loading ? (
        <div className="flex-1 flex justify-center items-center py-20">
          <Spin size="large" tip="Đang tải bài học..." />
        </div>
      ) : weeks.length === 0 ? (
        <div className="text-gray-400 font-medium py-20 text-lg">
          Không có dữ liệu bài học cho chủ đề này.
        </div>
      ) : (
        /* 2. Danh sách bài học hiển thị theo tuần */
        <div className="w-full max-w-4xl flex flex-col gap-12">
          {weeks.map((week) => (
            <div key={week.week_id} className="flex flex-col items-center">
              
              {/* Tiêu đề Tuần (ví dụ: TUẦN 19:) */}
              <h2 className="text-[#DE5E51] text-3xl md:text-4xl font-black mb-8 italic tracking-wide">
                {week.week_title}
              </h2>

              {/* Grid 2 cột cho các bài học trong tuần */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                {week.lessons && week.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="group flex flex-col items-center cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/danh-sach-lop/${classId || 'lop-2'}/ky/${termId || '1'}/chu-de/${topicId || '1'}/bai-hoc/${lesson.id}`
                      )
                    }
                  >
                    {/* Khung ảnh bài học: Tỉ lệ 16:9, bo góc mạnh, hiệu ứng hover */}
                    <div className="w-full aspect-[16/9] mb-4 overflow-hidden rounded-2xl shadow-md border-4 border-white group-hover:border-[#FFD2A8] transition-all duration-300 bg-white">
                      <img
                        src={Array.isArray(lesson.image_url) ? lesson.image_url[0] : (lesson.image_url || DEFAULT_LESSON_IMAGE)}
                        alt={lesson.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = DEFAULT_LESSON_IMAGE;
                        }}
                      />
                    </div>

                    {/* Tiêu đề bài học: Xử lý xuống dòng tự động từ \n trong chuỗi JSON */}
                    <h3 className="text-black font-extrabold text-xl md:text-2xl text-center leading-tight whitespace-pre-line uppercase group-hover:text-[#DE5E51] transition-colors">
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