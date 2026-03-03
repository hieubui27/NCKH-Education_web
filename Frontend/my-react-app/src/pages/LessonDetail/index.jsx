import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Spin, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const LessonDetail = () => {
  const navigate = useNavigate();
  // Lấy các tham số từ URL để xây dựng cấu trúc điều hướng chính xác
  const { classId, termId, topicId, lessonId } = useParams();

  const [loading, setLoading] = useState(true);
  const [lesson, setLesson] = useState(null);
  const [words, setWords] = useState([]);

  useEffect(() => {
    const fetchLessonDetail = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        // Gọi API lấy chi tiết bài học theo themeId (topicId) và lessonId
        const res = await fetch(`http://localhost:5000/api/lessons/${topicId}/${lessonId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: 'include',
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || 'Không lấy được dữ liệu bài học');
        }

        // Bóc tách dữ liệu từ cấu trúc backend trả về
        const lessonDataRaw = data.data?.lessonData;
        const wordsDataRaw = data.data?.wordsData || [];

        const mainLesson =
          Array.isArray(lessonDataRaw) && lessonDataRaw.length > 0
            ? lessonDataRaw[0]
            : lessonDataRaw || null;

        setLesson(mainLesson);
        setWords(wordsDataRaw);
      } catch (error) {
        console.error('Lỗi tải bài học:', error);
        message.error(error.message || 'Có lỗi xảy ra khi tải bài học');
      } finally {
        setLoading(false);
      }
    };

    if (lessonId && topicId) {
      fetchLessonDetail();
    }
  }, [lessonId, topicId]);

  /**
   * Logic Highlight:
   * 1. Tìm tất cả các từ khóa trong nội dung bài học.
   * 2. Chuyển chúng thành các thẻ <span> có thể click.
   * 3. Khi click sẽ chuyển hướng đến trang WordDetail.
   */
  const highlightedContent = useMemo(() => {
    if (!lesson?.content) return null;

    // Tạo wordMap để tra cứu nhanh id từ word string (case-insensitive)
    const wordMap = {};
    if (Array.isArray(words)) {
      words.forEach((w) => {
        if (w.word) {
          wordMap[w.word.trim().toLowerCase()] = w.id;
        }
      });
    }

    const wordList = Object.keys(wordMap);

    // Nếu không có từ vựng nào cần highlight, trả về văn bản thuần túy
    if (wordList.length === 0) {
      return lesson.content.split('\n').map((line, idx) => (
        <p key={idx} className="mb-4 leading-relaxed text-justify text-gray-800">
          {line}
        </p>
      ));
    }

    // Tạo Regex để tìm các từ khóa (sắp xếp từ dài nhất đến ngắn nhất để tránh lỗi khớp đè)
    const escapedWords = wordList
      .sort((a, b) => b.length - a.length)
      .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    
    // Sử dụng Capture Group để giữ lại từ khóa trong mảng split
    const regex = new RegExp(`(${escapedWords.join('|')})`, 'gi');
    const lines = lesson.content.split('\n');

    return lines.map((line, lineIdx) => {
      const parts = line.split(regex);

      return (
        <p key={lineIdx} className="mb-4 leading-relaxed text-justify text-gray-800">
          {parts.map((part, partIdx) => {
            const lowerPart = part.toLowerCase();
            if (wordMap[lowerPart]) {
              // Nếu phần văn bản này là một từ khóa
              return (
                <span
                  key={partIdx}
                  onClick={() =>
                    navigate(
                      `/danh-sach-lop/${classId}/ky/${termId}/chu-de/${topicId}/bai-hoc/${lessonId}/tu-vung/${wordMap[lowerPart]}`
                    )
                  }
                  className="font-bold underline decoration-2 decoration-[#DE5E51] text-[#DE5E51] cursor-pointer hover:text-[#b84a3f] transition-all"
                >
                  {part}
                </span>
              );
            }
            return part; // Văn bản thường
          })}
        </p>
      );
    });
  }, [lesson, words, classId, termId, topicId, lessonId, navigate]);

  const handleBack = () => {
    if (classId && termId && topicId) {
      navigate(`/danh-sach-lop/${classId}/ky/${termId}/chu-de/${topicId}`);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-[#FEFBF4] rounded-2xl pt-4 pb-12 px-4 overflow-y-auto">
      <div className="w-full max-w-5xl bg-[#FFFDE7] rounded-[2.5rem] shadow-md border border-[#E5D8A9] px-6 sm:px-12 py-8 relative">
        
        {/* Thanh công cụ phía trên */}
        <div className="flex items-center justify-between mb-8">
          <Button
            type="default"
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
            className="flex items-center gap-2 rounded-full bg-white border-2 border-[#A3C46F] text-[#3E5F2C] font-bold px-6 py-5 shadow-sm hover:bg-[#F3FAEA] transition-colors"
          >
            Quay lại
          </Button>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-24">
            <Spin size="large" className="mb-4" />
            <p className="text-[#A3C46F] font-semibold">Đang chuẩn bị bài đọc...</p>
          </div>
        ) : !lesson ? (
          <div className="py-20 text-center text-gray-500 font-semibold">
            Không tìm thấy nội dung bài học này.
          </div>
        ) : (
          <div className="bg-[#FFFDF3] rounded-3xl border border-[#F0E1B2] px-6 sm:px-14 py-10 shadow-inner">
            {/* Tiêu đề bài học */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#DE5E51] text-center mb-10 tracking-tight">
              {lesson.title || 'BÀI ĐỌC'}
            </h1>

            {/* Nội dung bài đọc */}
            <div className="mt-6 text-lg sm:text-xl md:text-2xl font-medium leading-[2.5rem]">
              {highlightedContent}
            </div>

            {/* Chú thích nhỏ bên dưới (tùy chọn) */}
            <div className="mt-12 flex justify-end italic text-gray-400 text-sm">
              * Nhấn vào những từ màu đỏ để xem giải nghĩa
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonDetail;