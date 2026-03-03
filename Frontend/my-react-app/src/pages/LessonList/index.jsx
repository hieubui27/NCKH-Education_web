import React, { useRef, useState, useEffect } from 'react';
import { Carousel, message, Spin } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import bannerImage from '../../assets/Group 1.png';
import img1 from '../../assets/baihoc/Bài 01. Chuyện bốn mùa.jfif';
import img2 from '../../assets/baihoc/Bài 02. Mùa nước nổi.jfif';
import img3 from '../../assets/baihoc/Bài 03. Họa mi hót.jfif';
import img4 from '../../assets/baihoc/Bài 04. Tết đến rồi.jfif';
import img5 from '../../assets/baihoc/Bài 05. Giọt nước và biển lớn.jfif';
import img6 from '../../assets/baihoc/Bài 06. Mùa vàng.jfif';
import img7 from '../../assets/baihoc/Bài 07. Hạt thóc.jfif';
import img8 from '../../assets/baihoc/Bài 08. Lũy tre.jfif';

const imageList = [img1, img2, img3, img4, img5, img6, img7, img8];

const LessonList = () => {
  const navigate = useNavigate();
  const { classId, termId, topicId } = useParams();
  const carouselRef = useRef(null);

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThemeContents = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/lessons/${topicId || '1'}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: 'include',
        });

        const data = await res.json();
        if (data.success && data.data) {
          let allLessons = [];
          data.data.forEach(week => {
            if (week.lessons && Array.isArray(week.lessons)) {
              allLessons = [...allLessons, ...week.lessons];
            }
          });

          const lessonsWithImages = allLessons.map((lesson, idx) => ({
            ...lesson,
            image: imageList[idx % imageList.length],
            title: lesson.title || `BÀI ${idx + 1}`
          }));

          setLessons(lessonsWithImages);
        } else {
          message.error(data.message || 'Lấy danh sách bài học thất bại');
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

  const chunks = [];
  for (let i = 0; i < lessons.length; i += 4) {
    chunks.push(lessons.slice(i, i + 4));
  }

  return (
    <div className="w-full min-h-full flex flex-col items-center bg-[#FEFBF4] rounded-2xl pt-2 pb-14 relative px-4">
      {/* Banner */}
      <div className="w-full max-w-5xl mb-6 mt-2">
        <img
          src={bannerImage}
          alt="Banner Cùng nhau tập đọc"
          className="w-full h-auto object-contain rounded-2xl"
        />
      </div>

      {loading ? (
        <div className="flex-1 flex justify-center items-center py-20">
          <Spin size="large" />
        </div>
      ) : lessons.length === 0 ? (
        <div className="flex-1 flex justify-center items-center py-20 text-gray-500 font-bold">
          Không có bài học nào trong chủ đề này.
        </div>
      ) : (
        <div className="w-full max-w-5xl relative group px-2 sm:px-12">
          {/* Carousel Khu vực Slider */}
          <Carousel ref={carouselRef} dots={true} effect="scrollx" className="pb-8">
            {chunks.map((chunk, slideIndex) => (
              <div key={slideIndex}>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 pt-4">
                  {chunk.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex flex-col items-center cursor-pointer transition-transform hover:-translate-y-1"
                      onClick={() =>
                        navigate(
                          `/danh-sach-lop/${classId || 'lop-2'}/ky/${termId || '1'}/chu-de/${topicId || '1'}/bai-hoc/${lesson.id}`
                        )
                      }
                    >
                      <div className="w-full aspect-[16/9] mb-4 overflow-hidden bg-white hover:shadow-lg transition-shadow rounded-lg">
                        <img
                          src={lesson.image}
                          alt={lesson.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-black font-extrabold text-lg md:text-xl text-center px-4">
                        {lesson.title}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Carousel>

          {/* Nút điều hướng Carousel (ẩn mặc định, hiện khi Hover) */}
          <button
            onClick={() => carouselRef.current.prev()}
            className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-100 text-[#DE5E51] hover:bg-[#DE5E51] hover:text-white transition-all z-10 opacity-0 group-hover:opacity-100 cursor-pointer"
          >
            <LeftOutlined style={{ fontSize: '24px' }} />
          </button>
          <button
            onClick={() => carouselRef.current.next()}
            className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-100 text-[#DE5E51] hover:bg-[#DE5E51] hover:text-white transition-all z-10 opacity-0 group-hover:opacity-100 cursor-pointer"
          >
            <RightOutlined style={{ fontSize: '24px' }} />
          </button>
        </div>
      )}
    </div>
  );
};

export default LessonList;
