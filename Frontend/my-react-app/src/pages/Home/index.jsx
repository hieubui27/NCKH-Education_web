import { useNavigate } from "react-router-dom";
import Banner from "../../components/Banner/Banner";
import poster from "../../assets/Picture1.png";
import function1 from "../../assets/Picture3.png";
import function2 from "../../assets/Picture4.png";
import function3 from "../../assets/Picture5.png";
import function4 from "../../assets/Picture6.png";

const Home = () => {
  const navigate = useNavigate();

  // Cập nhật đường dẫn 'link' tương ứng với Route trong App.js của bạn
  const features = [
    { id: 1, image: function1, link: "/hoc-tap" }, 
    { id: 2, image: function2, link: "/thi-thu" },
    { id: 3, image: function3, link: "/tro-choi" },
    { id: 4, image: function4, link: "/thanh-tich" },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDEF] flex flex-col items-center pb-20 font-sans overflow-x-hidden">
      {/* Poster chính */}
      <div className="w-full max-w-7xl mt-8 mb-8 px-4 z-10">
        <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
          <img src={poster} className="w-full h-auto object-cover" alt="main poster" />
        </div>
      </div>

      <Banner />

      {/* Phần Tính năng nổi bật */}
      <div className="w-full max-w-7xl mt-12 px-4 sm:px-6 z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#EB7470] drop-shadow-sm">
            Tính năng nổi bật
          </h2>
          <p className="text-gray-600 mt-2 font-bold italic">
            Nhấn vào hình ảnh để khám phá ngay!
          </p>
        </div>

        {/* Grid 4 ảnh full khung, tỉ lệ 3:4 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(item.link)} // Lệnh chuyển trang khi click
              className="group relative cursor-pointer overflow-hidden rounded-3xl shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl active:scale-95"
            >
              <div className="aspect-[3/4] w-full">
                <img
                  src={item.image}
                  alt={`Feature ${item.id}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Hiệu ứng lớp phủ khi di chuột vào */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                 <span className="text-white font-bold bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm scale-0 group-hover:scale-100 transition-transform duration-300">
                   Khám phá
                 </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nút Call to Action cuối trang */}
      <div className="mt-20 text-center z-10">
        <button
          onClick={() => navigate('/login')}
          className="bg-[#EB7470] hover:bg-[#d85e5a] text-white text-2xl font-extrabold px-14 py-5 rounded-full shadow-[0_10px_0_#b53b37] active:shadow-none active:translate-y-2 transition-all duration-150 cursor-pointer"
        >
          Bắt đầu học ngay! 🚀
        </button>
      </div>
    </div>
  );
};

export default Home;