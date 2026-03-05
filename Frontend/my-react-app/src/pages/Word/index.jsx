import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Spin, message } from 'antd';
import { ArrowLeftOutlined, SwapOutlined } from '@ant-design/icons';

// Import Swiper React components & styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const WordDetail = () => {
  const { themeId, lessonId, wordId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [wordData, setWordData] = useState(null);

  useEffect(() => {
    const fetchWordDetail = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const res = await fetch(`/api/lessons/${themeId}/${lessonId}/${wordId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const result = await res.json();
        if (result.success && result.data?.length > 0) {
          setWordData(result.data[0]);
        }
      } catch (error) {
        message.error("Lỗi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };
    fetchWordDetail();
  }, [themeId, lessonId, wordId]);

  const collocations = wordData?.related_words 
    ? wordData.related_words.split('\n').filter(item => item.trim() !== "")
    : [];

  if (loading) return <div className="h-screen flex justify-center items-center bg-[#FEFBF4]"><Spin size="large" /></div>;

  return (
    <div className="w-full h-screen bg-[#A3D977] p-4 flex flex-col items-center">
      {/* Nút Quay lại cố định phía trên */}
      <div className="w-full max-w-5xl mb-4 flex justify-start">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate(-1)}
          className="bg-white border-none rounded-full font-bold px-6 py-5 shadow-md"
        >
          Quay lại
        </Button>
      </div>

      {/* Container Slide chính */}
      <div className="w-full max-w-4xl h-[85vh] bg-[#FEFBF4] rounded-[2.5rem] shadow-2xl overflow-hidden relative">
        <Swiper
          direction={'vertical'} // Vuốt dọc như slide bạn muốn
          slidesPerView={1}
          spaceBetween={0}
          mousewheel={true}
          pagination={{ clickable: true }}
          modules={[Pagination, Navigation, Mousewheel]}
          className="h-full w-full"
        >
          {/* SLIDE 1: NGHĨA VÀ VÍ DỤ */}
          <SwiperSlide className="p-8 sm:p-12 flex flex-col">
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-[#6B8E23] font-bold text-xl mb-4 text-left">Nghĩa và ví dụ :</h2>
              <div className="mb-4">
                <span className="text-[#DE5E51] font-black text-5xl uppercase block mb-2">
                  {wordData?.word}
                </span>
                <p className="text-2xl text-gray-700 italic leading-relaxed">
                  {wordData?.simplified_meaning || wordData?.standard_meaning}
                </p>
              </div>
              <div className="w-full flex justify-center mt-6">
                <img 
                  src={wordData?.image_url || 'https://picsum.photos/800/500?education'} 
                  className="rounded-3xl shadow-xl max-h-[40vh] object-cover border-8 border-white"
                  alt="minh hoa"
                />
              </div>
            </div>
            <div className="text-center text-gray-400 animate-bounce mt-4">
              <p className="text-sm">Vuốt lên để xem sơ đồ</p>
              <span>↓</span>
            </div>
          </SwiperSlide>

          {/* SLIDE 2: MINDMAP VÀ CÂU VÍ DỤ */}
          <SwiperSlide className="p-8 sm:p-12 flex flex-col overflow-y-auto">
            <h2 className="text-[#6B8E23] font-bold text-xl mb-6">Ngữ cảnh sử dụng :</h2>
            
            <div className="relative w-full h-[400px] flex items-center justify-center mb-6 scale-90 sm:scale-100">
              {/* Tâm */}
              <div className="relative z-30 bg-white border-[3px] border-[#DE5E51] text-[#DE5E51] px-8 py-3 rounded-full font-black text-2xl shadow-md">
                {wordData?.word}
              </div>

              {/* Mũi tên nét liền động */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#DE5E51" />
                  </marker>
                </defs>
                {collocations.map((_, index) => {
                  const total = collocations.length;
                  const angle = (index * (360 / total) - 90) * (Math.PI / 180);
                  const radius = 140;
                  const centerX = 380; // Cân chỉnh lại theo khung slide
                  const centerY = 200;
                  const endX = centerX + Math.cos(angle) * radius;
                  const endY = centerY + Math.sin(angle) * radius;
                  const startX = centerX + Math.cos(angle) * 65;
                  const startY = centerY + Math.sin(angle) * 35;
                  const cpX = centerX + Math.cos(angle + 0.3) * (radius * 0.6);
                  const cpY = centerY + Math.sin(angle + 0.3) * (radius * 0.6);
                  return (
                    <path key={index} d={`M ${startX} ${startY} Q ${cpX} ${cpY} ${endX} ${endY}`}
                      fill="none" stroke="#DE5E51" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#arrowhead)" />
                  );
                })}
              </svg>

              {/* Chữ xung quanh */}
              {collocations.map((text, index) => {
                const total = collocations.length;
                const angle = (index * (360 / total) - 90) * (Math.PI / 180);
                const x = Math.cos(angle) * 180;
                const y = Math.sin(angle) * 180;
                return (
                  <div key={index} className="absolute z-20 bg-white px-4 py-2 rounded-xl shadow-sm border border-[#F0E1B2] font-bold text-[#444]"
                    style={{ transform: `translate(${x}px, ${y}px)` }}>
                    {text}
                  </div>
                );
              })}
            </div>

            {/* Câu ví dụ ở cuối Slide 2 */}
            <div className="space-y-3">
              {wordData?.example_sentences?.map((item, idx) => (
                <div key={idx} className="bg-[#FFFDF3] border-l-8 border-[#A3D977] p-4 rounded-r-xl shadow-sm italic font-bold text-lg">
                  {idx + 1}. "{item.text}"
                </div>
              ))}
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <style jsx="true">{`
        .swiper-pagination-bullet-active {
          background: #DE5E51 !important;
        }
        .swiper-slide {
          background: #FEFBF4 !important;
        }
      `}</style>
    </div>
  );
};

export default WordDetail;