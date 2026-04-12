import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Spin, message } from 'antd';
import http from '../../utils/http';

const branchMap = {
  'tu-nghia': { title: 'Từ gần nghĩa - Từ trái nghĩa' },
  'ngu-canh': { title: 'Ngữ cảnh sử dụng' },
  'dat-cau': { title: 'Sử dụng từ trong câu' },
};

const renderImages = (imageUrl, grayscale) => {
  if (!imageUrl || (Array.isArray(imageUrl) && imageUrl.length === 0)) return null;
  const urls = Array.isArray(imageUrl) ? imageUrl : [imageUrl];
  return (
    <div className="flex gap-2 flex-wrap">
      {urls.map((url, i) => (
        <img 
          key={i} 
          src={url} 
          alt="context" 
          className={`w-20 h-20 rounded-xl object-cover flex-shrink-0 ${grayscale ? 'grayscale-[0.5]' : 'border border-gray-100'}`} 
        />
      ))}
    </div>
  );
};

const WordBranchDetail = () => {
  const navigate = useNavigate();
  const { classId, termId, topicId, lessonId, wordId, branchKey } = useParams();
  const [loading, setLoading] = useState(true);
  const [wordData, setWordData] = useState(null);

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
        message.error('Lỗi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };
    fetchWordDetail();
  }, [topicId, lessonId, wordId]);

  // Chuẩn bị dữ liệu
  const synonyms = Array.isArray(wordData?.synonyms) ? wordData.synonyms.filter(Boolean) : [];
  const antonyms = Array.isArray(wordData?.antonyms) ? wordData.antonyms.filter(Boolean) : [];
  const contexts = Array.isArray(wordData?.contexts) ? wordData.contexts.filter((c) => c?.content) : [];

  // ✅ SỬA: Lọc dựa trên trường 'sentence' thay vì 'content'
  const sentences = Array.isArray(wordData?.sentences)
    ? wordData.sentences.filter((s) => s?.sentence)
    : [];

  const branchTitle = branchMap[branchKey]?.title || 'Chi tiết nhánh';

  const renderedContent = useMemo(() => {
    if (loading) return <div className="flex justify-center p-10"><Spin /></div>;

    // --- Nhánh: Từ gần nghĩa / Trái nghĩa ---
    if (branchKey === 'tu-nghia') {
      return (
        <div className="space-y-6">
          <div className="bg-white border border-[#F0E1B2] rounded-2xl p-6 shadow-sm">
            <p className="font-black text-[#DE5E51] mb-4 uppercase text-sm tracking-wider">Từ gần nghĩa</p>
            <div className="flex flex-wrap gap-3">
              {synonyms.length > 0 ? (
                synonyms.map((s, i) => (
                  <div key={i} className="px-5 py-2.5 rounded-2xl bg-[#C9DAF8] text-gray-800 font-bold text-lg shadow-sm border border-blue-100/50">
                    {s}
                  </div>
                ))
              ) : (
                <p className="text-gray-400 italic">Chưa có dữ liệu</p>
              )}
            </div>
          </div>
          <div className="bg-white border border-[#F0E1B2] rounded-2xl p-6 shadow-sm">
            <p className="font-black text-[#DE5E51] mb-4 uppercase text-sm tracking-wider">Từ trái nghĩa</p>
            <div className="flex flex-wrap gap-3">
              {antonyms.length > 0 ? (
                antonyms.map((a, i) => (
                  <div key={i} className="px-5 py-2.5 rounded-2xl bg-[#F9CB9A] text-gray-800 font-bold text-lg shadow-sm border border-orange-100/50">
                    {a}
                  </div>
                ))
              ) : (
                <p className="text-gray-400 italic">Chưa có dữ liệu</p>
              )}
            </div>
          </div>
        </div>
      );
    }

    // --- Nhánh: Ngữ cảnh sử dụng ---
    if (branchKey === 'ngu-canh') {
      const appropriateContexts = contexts.filter(item => item.is_appropriate);
      const inappropriateContexts = contexts.filter(item => !item.is_appropriate);

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2 bg-[#E8F5E9] py-2 px-4 rounded-full w-fit">
              <span className="text-lg">✅</span>
              <h3 className="font-black text-[#2E7D32] text-sm uppercase">Bối cảnh phù hợp</h3>
            </div>
            {appropriateContexts.map((item, idx) => (
              <div key={item.id || idx} className="bg-white border-2 border-[#A3D977] rounded-2xl p-4 shadow-sm">
                <div className="flex flex-row gap-4 items-start">
                  {renderImages(item.image_url, false)}
                  <div className="flex-1">
                    <p className="font-bold text-[#333] text-lg leading-tight">{item.content}</p>
                    {item.explanation && <p className="text-base text-gray-700 mt-2 italic leading-relaxed opacity-90">{item.explanation}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2 bg-[#FFEBEE] py-2 px-4 rounded-full w-fit">
              <span className="text-lg">⛔</span>
              <h3 className="font-black text-[#C62828] text-sm uppercase">Bối cảnh không phù hợp</h3>
            </div>
            {inappropriateContexts.map((item, idx) => (
              <div key={item.id || idx} className="bg-white border-2 border-[#FFCDD2] rounded-2xl p-4 shadow-sm opacity-90">
                <div className="flex flex-row gap-4 items-start">
                  {renderImages(item.image_url, true)}
                  <div className="flex-1">
                    <p className="font-bold text-[#333] text-lg leading-tight">{item.content}</p>
                    {item.explanation && <p className="text-base text-gray-700 mt-2 italic leading-relaxed">{item.explanation}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // --- ✅ SỬA: Nhánh Đặt câu (Sử dụng từ trong câu) ---
    if (branchKey === 'dat-cau') {
      return (
        <div className="space-y-4">
          {sentences.length === 0 ? (
            <p className="text-gray-400 italic text-center py-10">Chưa có ví dụ đặt câu cho từ này</p>
          ) : (
            sentences.map((item, idx) => (
              <div
                key={item.id || idx}
                className="bg-white border-l-8 border-[#A3D977] rounded-r-3xl p-6 shadow-md hover:translate-x-1 transition-transform"
              >
                <p className="text-xl font-medium text-[#444] leading-relaxed italic">
                  <span className="text-[#6B8E23] font-black mr-3 not-italic">{idx + 1}.</span>
                  "{item.sentence}"
                </p>
              </div>
            ))
          )}
        </div>
      );
    }

    return null;
  }, [branchKey, synonyms, antonyms, contexts, sentences, loading]);

  return (
    <div className="w-full h-screen bg-[#A3D977] p-4 flex flex-col items-center overflow-hidden font-sans">
      <div className="w-full max-w-5xl mb-6 flex justify-between items-center">
        <div className="flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 bg-white text-[#6B8E23] font-bold py-3 px-6 rounded-2xl shadow-[0_4px_0_0_#8dbd65] active:translate-y-1 active:shadow-none transition-all"
          >
            <ArrowLeftOutlined />
            <span>QUAY LẠI</span>
          </button>
          <button
            onClick={() => navigate(`/danh-sach-lop/${classId}/ky/${termId}/chu-de/${topicId}/bai-hoc/${lessonId}/tu-vung/${wordId}`)}
            className="bg-white/80 text-[#DE5E51] font-bold py-3 px-6 rounded-2xl border-2 border-[#F0E1B2] hover:bg-white transition-colors"
          >
            Về trang từ
          </button>
        </div>
        <div className="bg-white px-6 py-2 rounded-2xl border-2 border-[#DE5E51] shadow-sm">
          <span className="text-[#DE5E51] font-black text-xl uppercase tracking-widest">{wordData?.word}</span>
        </div>
      </div>

      <div className="w-full max-w-5xl h-[80vh] bg-[#FEFBF4] rounded-[3.5rem] shadow-2xl overflow-y-auto border-b-[12px] border-[#F0E1B2]">
        <div className="p-8 sm:p-14">
          <div className="mb-8 border-b-2 border-dashed border-[#F0E1B2] pb-6">
            <h2 className="text-[#6B8E23] font-black text-3xl uppercase tracking-tight">{branchTitle}</h2>
          </div>
          <div className="min-h-[40vh]">
            {renderedContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordBranchDetail;