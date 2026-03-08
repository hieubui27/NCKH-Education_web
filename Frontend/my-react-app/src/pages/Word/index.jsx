import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Spin, message } from 'antd';
import { ArrowLeftOutlined, SwapOutlined } from '@ant-design/icons';
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

  const mediaList = [];
  if (wordData?.image_url) mediaList.push({ type: 'image', url: wordData.image_url });
  if (wordData?.video_url) mediaList.push({ type: 'video', url: wordData.video_url });
  if (mediaList.length === 0) mediaList.push({ type: 'image', url: 'https://picsum.photos/800/500?education' });

  if (loading) return <div className="h-screen flex justify-center items-center bg-[#FEFBF4]"><Spin size="large" /></div>;

  return (
    <div className="w-full h-screen bg-[#A3D977] p-4 flex flex-col items-center overflow-hidden">
      <div className="w-full max-w-5xl mb-4 flex justify-start">
        <button 
          onClick={() => navigate(-1)}
          className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2 transition-all active:scale-95"
        >
          <ArrowLeftOutlined /> Quay lại
        </button>
      </div>

      <div className="w-full max-w-4xl h-[85vh] bg-[#FEFBF4] rounded-[2.5rem] shadow-2xl overflow-hidden relative">
        <Swiper
          direction={'vertical'}
          slidesPerView={1}
          spaceBetween={0}
          mousewheel={true}
          pagination={{ clickable: true }}
          modules={[Pagination, Navigation, Mousewheel]}
          className="h-full w-full main-vertical-swiper"
        >
          <SwiperSlide className="p-8 sm:p-12 flex flex-col h-full">
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-[#6B8E23] font-bold text-xl mb-4">Nghĩa và ví dụ :</h2>
              <div className="mb-4">
                <span className="text-[#DE5E51] font-black text-5xl uppercase block mb-2 leading-tight">
                  {wordData?.word}
                </span>
                <p className="text-2xl text-gray-700 italic leading-relaxed">
                  {wordData?.simplified_meaning || wordData?.standard_meaning}
                </p>
              </div>

              <div className="w-full mt-6 relative rounded-3xl overflow-hidden border-8 border-white shadow-xl bg-gray-50">
                <Swiper
                  direction={'horizontal'}
                  slidesPerView={1}
                  navigation={mediaList.length > 1}
                  pagination={{ clickable: true, dynamicBullets: true }}
                  modules={[Pagination, Navigation]}
                  className="h-[40vh] w-full"
                >
                  {mediaList.map((media, index) => (
                    <SwiperSlide key={index} className="flex items-center justify-center bg-black">
                      {media.type === 'video' ? (
                        <video controls className="w-full h-full object-contain" poster={wordData?.image_url}>
                          <source src={media.url} type="video/mp4" />
                        </video>
                      ) : (
                        <img src={media.url} className="w-full h-full object-cover" alt="media" />
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>
                {mediaList.length > 1 && (
                  <div className="absolute bottom-2 right-4 z-10 text-white bg-black/30 px-3 py-1 rounded-full text-xs flex items-center gap-1 backdrop-blur-sm">
                    <SwapOutlined /> Vuốt ngang xem thêm
                  </div>
                )}
              </div>
            </div>
            <div className="text-center text-gray-400 animate-bounce mt-4 flex flex-col items-center">
              <p className="text-sm">Vuốt lên xem sơ đồ</p>
              <span className="text-lg">↓</span>
            </div>
          </SwiperSlide>

          <SwiperSlide className="p-8 sm:p-12 flex flex-col overflow-y-auto">
            <h2 className="text-[#6B8E23] font-bold text-xl mb-6">Ngữ cảnh sử dụng :</h2>
            
            <div className="relative w-full h-[400px] flex items-center justify-center mb-6 scale-90 sm:scale-100 overflow-visible">
              <div className="relative z-30 bg-white border-[3px] border-[#DE5E51] text-[#DE5E51] px-8 py-3 rounded-full font-black text-2xl shadow-md">
                {wordData?.word}
              </div>

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
                  const centerX = 400; 
                  const centerY = 200;
                  const endX = centerX + Math.cos(angle) * radius;
                  const endY = centerY + Math.sin(angle) * radius;
                  const startX = centerX + Math.cos(angle) * 65;
                  const startY = centerY + Math.sin(angle) * 35;
                  const cpX = centerX + Math.cos(angle + 0.2) * (radius * 0.5);
                  const cpY = centerY + Math.sin(angle + 0.2) * (radius * 0.5);
                  return (
                    <path key={index} d={`M ${startX} ${startY} Q ${cpX} ${cpY} ${endX} ${endY}`}
                      fill="none" stroke="#DE5E51" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#arrowhead)" />
                  );
                })}
              </svg>

              {collocations.map((text, index) => {
                const total = collocations.length;
                const angle = (index * (360 / total) - 90) * (Math.PI / 180);
                const x = Math.cos(angle) * 180;
                const y = Math.sin(angle) * 180;
                return (
                  <div key={index} className="absolute z-20 bg-white px-4 py-2 rounded-xl shadow-sm border border-[#F0E1B2] font-bold text-[#444] whitespace-nowrap"
                    style={{ transform: `translate(${x}px, ${y}px)` }}>
                    {text}
                  </div>
                );
              })}
            </div>

            <div className="space-y-3 pb-8">
              {wordData?.example_sentences?.map((item, idx) => (
                <div key={idx} className="bg-[#FFFDF3] border-l-8 border-[#A3D977] p-4 rounded-r-xl shadow-sm italic font-bold text-lg text-gray-800">
                  {idx + 1}. "{item.text}"
                </div>
              ))}
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <style jsx="true">{`
        .main-vertical-swiper > .swiper-pagination-vertical .swiper-pagination-bullet-active {
          background: #DE5E51 !important;
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 18px !important;
          font-weight: bold;
        }
        .swiper-button-next, .swiper-button-prev {
          background: white;
          width: 35px !important;
          height: 35px !important;
          border-radius: 50%;
          color: #DE5E51 !important;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .swiper-pagination-bullet {
          background: #DE5E51;
        }
      `}</style>
    </div>
  );
};

export default WordDetail;