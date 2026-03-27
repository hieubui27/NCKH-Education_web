import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spin, message } from 'antd';
import bannerImage from '../../assets/Group 1.png';

const TopicItem = ({ title, path, imageUrl, marginTop }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`relative flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:-translate-y-3 active:scale-90 ${marginTop}`}
      onClick={() => navigate(path)}
    >
      <div className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60">
        <div
          className="w-full h-full rounded-full bg-white overflow-hidden shadow-xl flex items-center justify-center relative z-10"
        >
          <img
            src={imageUrl || 'https://picsum.photos/400/400?education'}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      </div>
    </div>
  );
};

const TopicList = () => {
  const { classId, termId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Chỉ cho phép hiển thị nếu là kỳ 2 (termId === '2')
  const isTerm2 = termId === '2';

  useEffect(() => {
    // Nếu không phải kỳ 2 thì không cần gọi API
    if (!isTerm2) {
      setLoading(false);
      return;
    }

    const fetchLessonsByTerm = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const res = await fetch(`/api/lessons`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || 'Không lấy được danh sách bài học');
        }

        setLessons(data.data || []);
      } catch (error) {
        console.error('Lỗi tải danh sách bài học:', error);
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLessonsByTerm();
  }, [termId, isTerm2]);

  return (
    <div className="w-full h-full min-h-[70vh] flex flex-col items-center bg-[#FEFBF4] rounded-2xl overflow-hidden pt-2 px-2 sm:px-0">
      <div className="w-full max-w-5xl mb-6 sm:mb-10 mt-4 sm:mt-6 px-2 sm:px-8">
        <img src={bannerImage} alt="Banner" className="w-full h-auto object-contain rounded-2xl" />
      </div>

      {loading ? (
        <div className="w-full flex justify-center items-center py-20">
          <Spin size="large" tip="Đang tải bài học..." />
        </div>
      ) : !isTerm2 ? (
        /* Hiển thị thông báo nếu không phải kỳ 2 */
        <div className="py-20 text-gray-500 font-bold uppercase tracking-widest text-center">
          Sẽ cập nhật trong thời gian tới
        </div>
      ) : lessons.length === 0 ? (
        <div className="py-20 text-gray-500 font-bold uppercase tracking-widest">
          Không tìm thấy bài học nào.
        </div>
      ) : (
        <div className="w-full max-w-[1300px] grid grid-cols-2 md:grid-cols-4 gap-x-4 sm:gap-x-10 md:gap-x-16 gap-y-10 sm:gap-y-24 px-2 sm:px-10 pb-10 sm:pb-20 pt-4 sm:pt-10 justify-items-center">
          {lessons.map((lesson, index) => {
            const isStaggeredDown = index % 2 !== 0;

            return (
              <TopicItem
                key={lesson.id}
                title={lesson.title}
                imageUrl={lesson.image_url}
                path={`/danh-sach-lop/${classId}/ky/${termId}/chu-de/${lesson.id}`}
                marginTop={isStaggeredDown ? 'md:mt-16' : 'md:-mt-8'}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TopicList;