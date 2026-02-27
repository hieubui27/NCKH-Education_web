import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import bannerImage from '../../assets/Group 1.png';

const TopicItem = ({ id, title, path, color, imageUrl, marginTop }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`relative flex flex-col items-center justify-center cursor-pointer transition-transform hover:-translate-y-2 ${marginTop}`}
      onClick={() => navigate(path)}
    >
      <div className="relative w-48 h-48 sm:w-60 sm:h-60">
        {/* Curved Text */}
        <svg viewBox="0 0 200 200" className="absolute top-[-30px] left-0 w-full h-full pointer-events-none z-20 overflow-visible">
          <path id={`curve-${id}`} d="M 0, 100 A 100,100 0 1,1 200,100" fill="transparent" />
          <text>
            <textPath
              href={`#curve-${id}`}
              startOffset="50%"
              textAnchor="middle"
              fill={color}
              style={{ fontSize: '18px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px' }}
            >
              {title}
            </textPath>
          </text>
        </svg>

        {/* Circular Image */}
        <div
          className="w-full h-full rounded-full border-[6px] sm:border-[8px] bg-white overflow-hidden shadow-md flex items-center justify-center relative z-10"
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

  // 4 Topics Data
  const topics = [
    { id: 1, title: 'Em lớn lên từng ngày', color: '#38BDF8' },
    { id: 2, title: 'Đi học vui sao', color: '#06B6D4' },
    { id: 3, title: 'Niềm vui tuổi thơ', color: '#3B82F6' },
    { id: 4, title: 'Mái ấm gia đình', color: '#0EA5E9' },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center bg-[#FEFBF4] rounded-2xl overflow-hidden pt-2">
      {/* Banner */}
      <div className="w-full max-w-5xl mb-10 mt-6 px-4 sm:px-8">
        <img
          src={bannerImage}
          alt="Banner Cùng nhau tập đọc"
          className="w-full h-auto object-contain rounded-2xl"
        />
      </div>

      {/* Grid of 4 Topics (Staggered Layout) */}
      <div className="w-full max-w-[1300px] grid grid-cols-2 md:grid-cols-4 gap-x-10 md:gap-x-16 gap-y-16 px-10 pb-20 pt-10 justify-items-center">
        {topics.map((topic, index) => {
          // Stagger effect: even index items vs odd index items
          const isStaggeredDown = index % 2 !== 0;

          return (
            <TopicItem
              key={topic.id}
              id={topic.id}
              title={topic.title}
              color={topic.color}
              // Generate some placeholder images safely matching the style loosely
              imageUrl={`https://picsum.photos/seed/topic${topic.id}/300/300`}
              path={`/danh-sach-lop/${classId || 'lop-2'}/ky/${termId || '1'}/chu-de/${topic.id}`}
              marginTop={isStaggeredDown ? 'mt-8 md:mt-24' : 'mt-0 md:-mt-10'}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TopicList;
