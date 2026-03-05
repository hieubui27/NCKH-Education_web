import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spin, message } from 'antd';
import bannerImage from '../../assets/Group 1.png';

const TopicItem = ({ id, title, path, color, imageUrl, marginTop }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`relative flex flex-col items-center justify-center cursor-pointer transition-transform hover:-translate-y-2 ${marginTop}`}
      onClick={() => navigate(path)}
    >
      <div className="relative w-48 h-48 sm:w-60 sm:h-60">
        {/* Chữ uốn lượn bên trên */}
        <svg viewBox="0 0 200 200" className="absolute top-[-35px] left-0 w-full h-full pointer-events-none z-20 overflow-visible">
          <path id={`curve-${id}`} d="M 20, 100 A 80,80 0 1,1 180,100" fill="transparent" />
          <text>
            <textPath
              href={`#curve-${id}`}
              startOffset="50%"
              textAnchor="middle"
              fill={color}
              style={{ fontSize: '14px', fontWeight: '900', textTransform: 'uppercase' }}
            >
              {title}
            </textPath>
          </text>
        </svg>

        {/* Hình ảnh tròn */}
        <div
          className="w-full h-full rounded-full border-8 bg-white overflow-hidden shadow-md flex items-center justify-center relative z-10"
          style={{ borderColor: color }}
        >
          <img
            src={imageUrl}
            alt={title}
            className="w-[96%] h-[96%] object-cover rounded-full"
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

  useEffect(() => {
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
  }, [termId]);

  return (
    <div className="w-full h-full flex flex-col items-center bg-[#FEFBF4] rounded-2xl overflow-hidden pt-2">
      <div className="w-full max-w-5xl mb-10 mt-6 px-4 sm:px-8">
        <img src={bannerImage} alt="Banner" className="w-full h-auto object-contain rounded-2xl" />
      </div>

      {loading ? (
        <div className="w-full flex justify-center items-center py-20">
          <Spin size="large" tip="Đang tải bài học..." />
        </div>
      ) : lessons.length === 0 ? (
        <div className="py-20 text-gray-500 font-bold">Không tìm thấy bài học nào.</div>
      ) : (
        <div className="w-full max-w-[1300px] grid grid-cols-2 md:grid-cols-4 gap-x-10 md:gap-x-16 gap-y-24 px-10 pb-20 pt-10 justify-items-center">
          {lessons.map((lesson, index) => {
            const colors = ['#38BDF8', '#06B6D4', '#3B82F6', '#0EA5E9', '#F97316', '#F43F5E'];
            const color = colors[index % colors.length];
            const isStaggeredDown = index % 2 !== 0;

            return (
              <TopicItem
                key={lesson.id}
                id={lesson.id}
                title={lesson.title}
                color={color}
                imageUrl={`https://picsum.photos/seed/${lesson.id}/300/300`}
                path={`/danh-sach-lop/${classId}/ky/${termId}/chu-de/${lesson.id}`}
                marginTop={isStaggeredDown ? 'md:mt-20' : 'md:-mt-10'}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TopicList;