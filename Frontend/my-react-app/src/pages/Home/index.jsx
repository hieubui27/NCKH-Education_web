import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Banner from "../../components/Banner/Banner";
import poster from "../../assets/Picture1.png";
import function1 from "../../assets/Picture3.png";
import function2 from "../../assets/Picture4.png";
import function3 from "../../assets/Picture5.png";
import function4 from "../../assets/Picture6.png";

import new1 from "../../assets/Tintuc1.png";
import new2 from "../../assets/Tintuc2.png";
import new3 from "../../assets/Tintuc3.png";
import new4 from "../../assets/Tintuc4.png";
import new5 from "../../assets/Tintuc5.png";
import new6 from "../../assets/Tintuc6.png";
import new7 from "../../assets/Tintuc7.png";
import new8 from "../../assets/Tintuc8.png";



const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  // Dữ liệu cho phần carousel tính năng nổi bật (vẫn giữ nguyên)
  const features = [
    { id: 1, image: function1, link: "/hoc-tap" },
    { id: 2, image: function2, link: "/thi-thu" },
    { id: 3, image: function3, link: "/tro-choi" },
    { id: 4, image: function4, link: "/thanh-tich" },
  ];

  // --- DỮ LIỆU TIN TỨC MỚI ---
  const newsData = [
    { id: 1, title: "Ra mắt website Vienkey - website hỗ trợ dạy học tập đọc cho học sinh rối loạn phổ tự kỷ học Tiểu học hòa nhập", image: new1 },
    { id: 2, title: "Các tính năng và hướng dẫn sử dụng website Vienkey", image: new2 },
    { id: 3, title: "Ra mắt tính năng tìm kiếm theo từ khóa - tra cứu nhanh, học tập tuận lợi", image: new3 },
    { id: 4, title: "Chủ đề ôn tập môn Tiếng việt lớp 2", image: new4 },
    { id: 5, title: "Chủ đề ôn tập môn Tiếng việt lớp 3", image: new5 },
    { id: 6, title: "Chủ đề ôn tập môn Tiếng việt lớp 4", image: new6 },
    { id: 7, title: "Chủ đề ôn tập môn Tiếng việt lớp 5", image: new7 },
    { id: 8, title: "Cách hỗ trợ học sinh rối loạn phổ tự kỷ hiểu nghĩa từ trong môn Tập đọc", image: new8 },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDEF] flex flex-col items-center pb-12 md:pb-20 font-sans overflow-x-hidden w-full">
      
      {/* Poster chính: Tối ưu khoảng cách và bo góc trên mobile */}
      <div className="w-full max-w-7xl mt-4 md:mt-8 mb-6 md:mb-8 px-4 z-10">
        <div className="relative overflow-hidden rounded-2xl md:rounded-[2rem] shadow-xl md:shadow-2xl">
          <img src={poster} className="w-full h-auto object-cover" alt="main poster" />
        </div>
      </div>

      <Banner />

      {/* Phần Tính năng nổi bật */}
      <div className="w-full max-w-7xl mt-8 md:mt-12 px-4 sm:px-6 z-10">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-5xl font-extrabold text-[#EB7470] drop-shadow-sm px-2">
            Tính năng nổi bật
          </h2>
        </div>

        <div className="w-full py-2 md:py-4">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={15} // Giảm khoảng cách trên mobile
            slidesPerView={1.2} // Hiển thị một phần của slide tiếp theo để người dùng biết có thể vuốt
            centeredSlides={true} // Căn giữa slide trên mobile
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            grabCursor={true}
            breakpoints={{
              640: { slidesPerView: 2, centeredSlides: false, spaceBetween: 20 },
              1024: { slidesPerView: 3, centeredSlides: false, spaceBetween: 30 },
            }}
            className="pb-10 md:pb-12"
          >
            {features.map((item) => (
              <SwiperSlide key={item.id}>
                <div
                  onClick={() => navigate(item.link)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl active:scale-95"
                >
                  <div className="aspect-[3/4] w-full">
                    <img src={item.image} alt={`Feature ${item.id}`} className="w-full h-full object-cover" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* --- PHẦN TIN TỨC MỚI --- */}
      <div className="w-full max-w-7xl mt-10 md:mt-16 px-4 sm:px-6 z-10">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800">
            Tin tức & Sự kiện
          </h2>
        </div>

        <div className="w-full">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={15}
            slidesPerView={1.1} // Vuốt mượt trên mobile
            loop={true}
            pagination={{ clickable: true }}
            breakpoints={{
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="pb-10 md:pb-12"
          >
            {newsData.map((news) => (
              <SwiperSlide key={news.id}>
                <div
                  className="bg-white rounded-xl md:rounded-2xl shadow-md overflow-hidden h-full flex flex-col"
                  onClick={() => navigate('/tin-tuc')}
                >
                  <div className="aspect-[16/10] w-full">
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3 md:p-4 flex-grow">
                    <h3 className="text-xs md:text-base font-bold text-gray-800 line-clamp-2">
                      {news.title}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="mt-6 md:mt-10 px-4 w-full flex justify-center z-10">
        <button
          onClick={() => navigate(isLoggedIn ? '/danh-sach-lop' : '/login')}
          className="w-full max-w-xs md:max-w-none bg-[#EB7470] hover:bg-[#d85e5a] text-lg md:text-2xl font-extrabold px-8 md:px-14 py-4 md:py-5 rounded-full shadow-[0_6px_0_#b53b37] md:shadow-[0_10px_0_#b53b37] active:shadow-none active:translate-y-1 md:active:translate-y-2 transition-all cursor-pointer"
        >
          Bắt đầu học ngay! 🚀
        </button>
      </div>
    </div>
  );
};

export default Home;