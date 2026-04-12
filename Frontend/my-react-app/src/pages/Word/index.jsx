import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin, message, Modal } from 'antd';
import { ArrowLeftOutlined, RightOutlined, EditOutlined, BulbOutlined } from '@ant-design/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel, Pagination } from 'swiper/modules';
import http from '../../utils/http';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const WordDetail = () => {
  const { classId, termId, topicId, lessonId, wordId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [wordData, setWordData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    const fetchWordDetail = async () => {
      try {
        setLoading(true);
        const result = await http(`/api/lessons/${topicId}/${lessonId}/${wordId}`, {
          method: 'GET',
        });
        if (result.success && result.data) {
          setWordData(result.data);
        }
      } catch (error) {
        message.error("Lỗi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };
    fetchWordDetail();
  }, [topicId, lessonId, wordId]);

  const displaySentences = Array.isArray(wordData?.sentences) ? wordData.sentences.slice(0, 3) : [];
  const mediaList = [];
  if (wordData?.image_url) {
    if (Array.isArray(wordData.image_url)) {
      wordData.image_url.forEach(url => mediaList.push({ type: 'image', url }));
    } else {
      mediaList.push({ type: 'image', url: wordData.image_url });
    }
  }
  if (wordData?.video_url) mediaList.push({ type: 'video', url: wordData.video_url });

  const getNuanceColor = (nuance) => {
    switch (nuance?.toLowerCase()) {
      case 'positive': case 'tích cực': return '#699B3D';
      case 'negative': case 'tiêu cực': return '#BE3D2E';
      case 'neutral': case 'trung tính': return '#FFBF41';
      default: return '#61B543';
    }
  };

  const handleBranchClick = (branchKey) => {
    navigate(`/danh-sach-lop/${classId}/ky/${termId}/chu-de/${topicId}/bai-hoc/${lessonId}/tu-vung/${wordId}/nhanh/${branchKey}`);
  };

  const handleQuizClick = (quizType) => {
    const exercise = wordData?.exercises?.find(ex => ex.type === quizType);
    if (exercise?.quiz_url) {
      window.open(exercise.quiz_url, '_blank', 'noopener,noreferrer');
    } else {
      message.info("Bài tập này đang được cập nhật!");
    }
  };

  if (loading) return <div className="h-screen flex justify-center items-center bg-[#FEFBF4]"><Spin size="large" /></div>;

  return (
    <div className="w-full h-screen bg-[#A3D977] p-2 sm:p-4 flex flex-col items-center overflow-hidden font-sans text-[#202020]">

      {/* Nút Quay Lại */}
      <div className="w-full max-w-5xl mb-3 flex justify-start gap-2">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 bg-white text-[#6B8E23] font-bold py-2 px-5 rounded-xl shadow-[0_4px_0_0_#8dbd65] hover:translate-y-[2px] transition-all border-2 border-[#8dbd65]/20 text-xs sm:text-sm"
        >
          <ArrowLeftOutlined />
          <span>QUAY LẠI</span>
        </button>
      </div>

      <div className="w-full max-w-4xl h-[84vh] bg-[#FEFBF4] rounded-[2.5rem] shadow-2xl overflow-hidden border-b-[10px] border-[#F0E1B2] relative">
        <Swiper
          direction={'vertical'}
          slidesPerView={1}
          mousewheel={true}
          pagination={{ clickable: true }}
          modules={[Navigation, Mousewheel, Pagination]}
          className="h-full w-full"
        >
          {/* SLIDE 1: GIẢI NGHĨA */}
          <SwiperSlide className="flex flex-col h-full overflow-hidden relative">
            <div className="w-full flex-1 overflow-y-auto p-4 sm:p-8 pb-12">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-4 items-start">
                <div>
                  {/* Tên từ & Sắc thái màu */}
                  <h1 className="font-black text-2xl sm:text-3xl uppercase leading-tight mb-1" style={{ color: getNuanceColor(wordData?.nuance) }}>
                    {wordData?.word}
                    <span className="text-gray-400 text-base italic font-normal normal-case ml-2">
                      {wordData?.pos ? `(${wordData.pos})` : ''}
                    </span>
                  </h1>

                  <div className="mt-2">
                    <h2 className="text-xl sm:text-2xl font-black mb-2 italic">
                      Giải nghĩa:
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-800 leading-relaxed font-medium">
                      {wordData?.simplified_meaning || wordData?.standard_meaning}
                    </p>
                  </div>
                </div>

                {/* Bảng mã màu */}
                <div className="bg-white border border-[#F0E1B2] rounded-2xl p-4 shadow-sm hidden md:block">
                  <p className="font-black text-xs mb-3 uppercase text-gray-400 tracking-tighter">Mã màu</p>
                  <div className="space-y-2 text-xs font-bold text-gray-500">
                    <div className="flex items-center gap-2"><span className="w-4 h-4 bg-[#C64A3B] rounded-sm" /><span>Tiêu cực</span></div>
                    <div className="flex items-center gap-2"><span className="w-4 h-4 bg-[#F2BC3D] rounded-sm" /><span>Trung tính</span></div>
                    <div className="flex items-center gap-2"><span className="w-4 h-4 bg-[#7EA53A] rounded-sm" /><span>Tích cực</span></div>
                  </div>
                </div>
              </div>

              {/* Phần Ví dụ */}
              <div className="mt-6 space-y-3 bg-white/60 p-5 rounded-3xl border border-dashed border-[#F0E1B2] shadow-sm w-full">
                <p className="font-black text-[#6B8E23] text-sm uppercase tracking-widest">Ví dụ:</p>
                {displaySentences.map((s, idx) => (
                  <p key={idx} className="text-xl sm:text-2xl text-gray-700 italic leading-relaxed font-medium">
                    ({idx + 1}) {s.sentence}
                  </p>
                ))}
                {displaySentences.length === 0 && <p className="text-base text-gray-400 italic">Chưa có ví dụ.</p>}
              </div>
            </div>

            <div className="absolute bottom-3 left-0 right-0 text-center text-gray-400 animate-bounce text-[11px] font-black uppercase tracking-widest pointer-events-none">
              ↓ Vuốt lên xem minh họa
            </div>
          </SwiperSlide>

          {/* SLIDE 2: MINH HỌA */}
          <SwiperSlide className="p-4 sm:p-8 pb-10 flex flex-col justify-center h-full overflow-hidden relative">
            <div className="w-full flex-1 flex flex-col justify-center min-h-0 max-w-3xl mx-auto">
              <h2 className="font-black text-2xl text-center mb-4 text-[#6B8E23] uppercase tracking-tight">Minh họa</h2>
              <div className="w-full rounded-[2rem] overflow-hidden border-[6px] border-white shadow-2xl bg-black aspect-video max-h-[60vh] mx-auto relative">
                <Swiper nested={true} navigation={false} pagination={{ clickable: true }} modules={[Pagination]} className="h-full w-full">
                  {mediaList.map((media, index) => (
                    <SwiperSlide key={index} className="flex items-center justify-center bg-black">
                      {media.type === 'video' ? (
                        <video controls className="w-full h-full object-contain">
                          <source src={media.url} type="video/mp4" />
                        </video>
                      ) : (
                        <img
                          src={media.url}
                          className="w-full h-full object-contain cursor-zoom-in"
                          onClick={() => { setModalImage(media.url); setIsModalOpen(true) }}
                          alt="minh họa"
                        />
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            <div className="absolute bottom-3 left-0 right-0 text-center text-gray-400 animate-bounce text-[11px] font-black uppercase tracking-widest pointer-events-none">
              ↓ Vuốt lên xem sơ đồ
            </div>
          </SwiperSlide>

          {/* SLIDE 3: SƠ ĐỒ TƯ DUY */}
          <SwiperSlide className="p-6 sm:p-10 pb-10 flex flex-col justify-center items-center h-full relative">
            <div className="w-full text-left mb-6 mt-[-2rem]">
              <h1 className="text-[#6B8E23] font-black text-2xl uppercase tracking-tight flex items-center gap-2">
                <BulbOutlined /> Mở rộng kiến thức
              </h1>
            </div>

            <div className="border-2 border-[#F0E1B2] bg-white mx-auto max-w-[750px] aspect-[16/10] rounded-[3rem] p-6 shadow-sm relative flex items-center justify-center w-full">
              <div className="relative w-full h-full">
                {/* SVG overlay: đường thẳng nối word div với các button */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <line x1="50" y1="42" x2="50" y2="22" stroke="#DE5E51" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="36" y1="56" x2="14" y2="80" stroke="#DE5E51" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="64" y1="56" x2="86" y2="80" stroke="#DE5E51" strokeWidth="1.5" strokeLinecap="round" />
                </svg>

                <button onClick={() => handleBranchClick('tu-nghia')} className="absolute top-[12%] left-1/2 -translate-x-1/2 z-20 bg-[#FFF9E9] border-2 border-[#F0E1B2] text-[#202020] px-6 py-2.5 rounded-2xl font-bold text-sm sm:text-base shadow-sm hover:bg-[#DE5E51] hover:text-white transition-all m-0 whitespace-nowrap">từ gần nghĩa / trái nghĩa</button>
                <button onClick={() => handleBranchClick('ngu-canh')} className="absolute bottom-[8%] left-[0%] md:left-[5%] z-20 bg-[#FFF9E9] border-2 border-[#F0E1B2] text-[#202020] px-5 py-2.5 rounded-2xl font-bold text-sm sm:text-base shadow-sm hover:bg-[#DE5E51] hover:text-white transition-all whitespace-nowrap">ngữ cảnh sử dụng</button>
                <button onClick={() => handleBranchClick('dat-cau')} className="absolute bottom-[8%] right-[0%] md:right-[5%] z-20 bg-[#FFF9E9] border-2 border-[#F0E1B2] text-[#202020] px-5 py-2.5 rounded-2xl font-bold text-sm sm:text-base shadow-sm hover:bg-[#DE5E51] hover:text-white transition-all whitespace-nowrap">sử dụng từ trong câu</button>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-white border-[4px] border-[#DE5E51] text-[#D92F2F] px-10 py-4 rounded-[1.5rem] font-black text-2xl sm:text-4xl shadow-xl uppercase tracking-tighter ring-8 ring-[#DE5E51]/5 whitespace-nowrap">
                  {wordData?.word}
                </div>
              </div>
            </div>
            <div className="absolute bottom-3 left-0 right-0 text-center text-gray-400 animate-bounce text-[11px] font-black uppercase tracking-widest pointer-events-none">↓ Vuốt lên để luyện tập</div>
          </SwiperSlide>

          {/* SLIDE 4: BÀI TẬP LUYỆN TẬP */}
          <SwiperSlide className="p-6 sm:p-12 flex flex-col h-full bg-[#FFFDF3] overflow-y-auto">
            <div className="w-full max-w-2xl mx-auto">
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-black text-[#202020] uppercase tracking-tight inline-block relative">
                  4. Bài tập luyện tập
                  <div className="h-2 w-full bg-[#A3D977] absolute bottom-1 left-0 -z-10 opacity-60"></div>
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  { id: 'fill', label: '1. Luyện tập về từ và nghĩa của từ', sub: '' },
                  { id: 'context', label: '2. Luyện tập về ngữ cảnh sử dụng từ', sub: '' },
                  { id: 'synonym', label: '3. Luyện tập từ đồng nghĩa – trái nghĩa', sub: '' },
                  { id: 'sentence', label: '4. Đặt câu với từ', sub: '' }
                ].map((item, index) => (
                  <div
                    key={item.id}
                    onClick={() => handleQuizClick(item.id)}
                    className="group bg-white border-2 border-[#F0E1B2] p-5 rounded-[2rem] flex items-center justify-between cursor-pointer hover:border-[#A3D977] hover:shadow-lg transition-all active:scale-95"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-lg font-black text-[#444] group-hover:text-[#6B8E23] transition-colors">{item.label}</span>
                      {item.sub && <span className="text-sm text-gray-400 italic font-medium">{item.sub}</span>}
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-[#F7F9F2] flex items-center justify-center text-[#6B8E23] group-hover:bg-[#A3D977] group-hover:text-white transition-all">
                      <RightOutlined className="text-xl font-bold" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <Modal open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)} centered width="auto" bodyStyle={{ padding: 0 }}>
        <img src={modalImage} className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl" alt="Preview" />
      </Modal>
    </div>
  );
};

export default WordDetail;