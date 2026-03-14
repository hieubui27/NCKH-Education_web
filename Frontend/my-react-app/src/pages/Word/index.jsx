import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin, message, Modal } from 'antd';
import { ArrowLeftOutlined, SwapOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const WordDetail = () => {
  const { themeId, lessonId, wordId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [wordData, setWordData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

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

  const handlePreview = (url) => {
    setModalImage(url);
    setIsModalOpen(true);
  };

  if (loading) return <div className="h-screen flex justify-center items-center bg-[#FEFBF4]"><Spin size="large" /></div>;

  return (
    <div className="w-full h-screen bg-[#A3D977] p-4 flex flex-col items-center overflow-hidden font-sans">
      <div className="w-full max-w-5xl mb-6 flex justify-start">
        <button
          onClick={() => navigate(-1)}
          className="group relative flex items-center gap-2 bg-white text-[#6B8E23] font-bold py-3 px-8 rounded-2xl shadow-[0_4px_0_0_#8dbd65] hover:shadow-[0_2px_0_0_#8dbd65] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] transition-all duration-150 border-2 border-[#8dbd65]/20 z-50"
        >
          <ArrowLeftOutlined className="group-hover:-translate-x-1 transition-transform" />
          <span>QUAY LẠI</span>
        </button>
      </div>

      <div className="w-full max-w-4xl h-[82vh] bg-[#FEFBF4] rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden border-b-[12px] border-[#F0E1B2] relative">
        <Swiper
          direction={'vertical'}
          slidesPerView={1}
          spaceBetween={0}
          mousewheel={true}
          modules={[Navigation, Mousewheel]}
          className="h-full w-full main-vertical-swiper"
        >
          <SwiperSlide className="p-6 sm:p-10 flex flex-col h-full bg-[#FEFBF4]">
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-[#6B8E23] font-bold text-lg mb-2">Giải nghĩa từ :</h2>

              <div className="mb-2">
                <span className="text-[#DE5E51] font-black text-4xl uppercase block mb-1 leading-tight">
                  {wordData?.word}
                </span>
                <p className="text-xl text-gray-700 italic leading-relaxed">
                  {wordData?.simplified_meaning || wordData?.standard_meaning}
                </p>
              </div>

              <h2 className="text-[#6B8E23] font-bold text-lg mt-1 mb-1">Ví dụ minh hoạ :</h2>

              <div className="w-full mt-3 relative rounded-3xl overflow-hidden border-8 border-white shadow-xl bg-black group z-20">
                <Swiper
                  direction={'horizontal'}
                  slidesPerView={1}
                  navigation={{
                    nextEl: '.custom-next',
                    prevEl: '.custom-prev',
                  }}
                  modules={[Navigation]}
                  className="h-[50vh] w-full"
                >
                  {mediaList.map((media, index) => (
                    <SwiperSlide key={index} className="flex items-center justify-center bg-black/5">
                      {media.type === 'video' ? (
                        <video controls className="w-full h-full object-contain" poster={wordData?.image_url}>
                          <source src={media.url} type="video/mp4" />
                        </video>
                      ) : (
                        <img
                          src={media.url}
                          // Sửa object-cover thành object-contain để hiện đầy đủ ảnh
                          className="w-full h-full object-contain cursor-zoom-in transition-transform duration-300 hover:scale-[1.01]"
                          alt="word media"
                          onClick={() => handlePreview(media.url)}
                        />
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>

                {mediaList.length > 1 && (
                  <>
                    <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-[60] bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-[#DE5E51] transition-all opacity-0 group-hover:opacity-100">
                      <LeftOutlined style={{ fontSize: '20px' }} />
                    </button>
                    <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-[60] bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-[#DE5E51] transition-all opacity-0 group-hover:opacity-100">
                      <RightOutlined style={{ fontSize: '20px' }} />
                    </button>
                    <div className="absolute bottom-4 right-6 z-50 text-white bg-black/40 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 backdrop-blur-sm pointer-events-none">
                      <SwapOutlined /> VUỐT NGANG XEM THÊM
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="text-center text-gray-400 animate-bounce mt-2 flex flex-col items-center pointer-events-none">
              <p className="text-sm font-bold uppercase tracking-wider">Vuốt lên xem sơ đồ</p>
              <span className="text-xl">↓</span>
            </div>
          </SwiperSlide>

          <SwiperSlide className="p-8 sm:p-12 flex flex-col overflow-y-auto bg-[#FEFBF4]">
            <h1 className="text-[#6B8E23] font-bold text-2xl mb-6">Ngữ cảnh sử dụng :</h1>
            <h2 className="text-[#6B8E23] font-bold text-xl mb-6">Sơ đồ :</h2>
            <div className="relative w-full min-h-[650px] mt-4 flex items-center justify-center mb-10 scale-[0.80] sm:scale-100 overflow-visible">
              <div className="relative z-30 bg-white border-[4px] border-[#DE5E51] text-[#DE5E51] px-10 py-4 rounded-full font-black text-3xl shadow-[0_6px_0_0_#DE5E51]">
                {wordData?.word}
              </div>

              <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 overflow-visible" width="1000" height="1000" viewBox="-500 -500 1000 1000">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#DE5E51" />
                  </marker>
                </defs>
                {collocations.map((_, index) => {
                  const total = collocations.length;
                  const angle = (index * (360 / total) - 90) * (Math.PI / 180);

                  let rx = 320;
                  let ry = 220;
                  if (total > 5) {
                    rx = index % 2 === 0 ? 400 : 270;
                    ry = index % 2 === 0 ? 300 : 180;
                  }

                  const x = Math.cos(angle) * rx;
                  const y = Math.sin(angle) * ry;

                  // Bắt đầu mũi tên ở rìa bong bóng trung tâm
                  const startX = Math.cos(angle) * 90;
                  const startY = Math.sin(angle) * 45;

                  // Dừng mũi tên trước text box mục tiêu
                  const endX = x - Math.cos(angle) * 125;
                  const endY = y - Math.sin(angle) * 50;

                  const cpX = Math.cos(angle + 0.2) * (rx * 0.4);
                  const cpY = Math.sin(angle + 0.2) * (ry * 0.4);

                  return (
                    <path key={index} d={`M ${startX} ${startY} Q ${cpX} ${cpY} ${endX} ${endY}`}
                      fill="none" stroke="#DE5E51" strokeWidth="3" strokeLinecap="round" markerEnd="url(#arrowhead)" />
                  );
                })}
              </svg>

              {collocations.map((text, index) => {
                const total = collocations.length;
                const angle = (index * (360 / total) - 90) * (Math.PI / 180);

                let rx = 320;
                let ry = 220;
                if (total > 5) {
                  rx = index % 2 === 0 ? 400 : 270;
                  ry = index % 2 === 0 ? 300 : 180;
                }

                const x = Math.cos(angle) * rx;
                const y = Math.sin(angle) * ry;
                return (
                  <div key={index} className="absolute z-20 bg-white px-5 py-2.5 rounded-2xl shadow-md border-2 border-[#F0E1B2] font-black text-[#444] text-center min-w-[120px] max-w-[260px] text-sm sm:text-lg flex items-center justify-center transition-all duration-300"
                    style={{ left: '50%', top: '50%', transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}>
                    {text}
                  </div>
                );
              })}
            </div>

            <h2 className="text-[#6B8E23] font-bold text-xl mb-4">Câu minh họa :</h2>
            <div className="space-y-4 pb-12">
              {wordData?.example_sentences?.map((item, idx) => (
                <div key={idx} className="bg-[#FFFDF3] border-l-[10px] border-[#A3D977] p-6 rounded-r-2xl shadow-sm italic font-bold text-xl text-gray-800 leading-relaxed">
                  {idx + 1}. "{item.text}"
                </div>
              ))}
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        centered
        width="auto"
        bodyStyle={{ padding: 0, backgroundColor: 'transparent' }}
        closeIcon={<div className="bg-white rounded-full p-2 shadow-lg"><ArrowLeftOutlined /></div>}
      >
        <img
          src={modalImage}
          alt="Preview"
          className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
        />
      </Modal>

      <style jsx="true">{`
        .swiper-button-disabled {
          opacity: 0 !important;
          pointer-events: none;
        }
        .ant-modal-content {
          background: transparent !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
};

export default WordDetail;