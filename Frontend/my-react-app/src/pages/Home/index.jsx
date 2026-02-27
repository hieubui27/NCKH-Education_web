import { useNavigate } from "react-router-dom";
import Banner from "../../components/Banner/Banner";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Vào lớp học',
      desc: 'Bắt đầu bài giảng và ôn tập',
      icon: '📚',
      color: 'bg-[#A7DE93]',
      hoverColor: 'hover:bg-[#61B543]',
      textColor: 'text-black',
      link: '/danh-sach-lop',
    },
    {
      title: 'Từ điển của bé',
      desc: 'Tra cứu từ vựng dễ hiểu',
      icon: '🔍',
      color: 'bg-[#FDE68A]', // yellow-200
      hoverColor: 'hover:bg-[#FCD34D]', // yellow-300
      textColor: 'text-black',
      link: '/giai-nghia',
    },
    {
      title: 'Hồ sơ học tập',
      desc: 'Xem thành tích của bé',
      icon: '🏆',
      color: 'bg-[#93C5FD]', // blue-300
      hoverColor: 'hover:bg-[#60A5FA]', // blue-400
      textColor: 'text-black',
      link: '/ca-nhan',
    },
    {
      title: 'Sân chơi',
      desc: 'Vừa học vừa chơi thật vui',
      icon: '🎨',
      color: 'bg-[#FCA5A5]', // red-300
      hoverColor: 'hover:bg-[#F87171]', // red-400
      textColor: 'text-black',
      link: '/danh-sach-lop', // fallback for now
    }
  ];

  return (
    <div className=" min-h-[calc(100vh-80px)] bg-[#FFFDEF] flex flex-col items-center pb-20 relative font-sans overflow-x-hidden">
      <Banner />

      <div className="w-full max-w-6xl mt-4 px-4 sm:px-8 z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#EB7470] mb-4 drop-shadow-sm">
          Khám phá thế giới của bé
        </h2>
        <p className="text-center text-lg md:text-xl text-gray-700 font-bold mb-10">
          Mỗi ngày đến trường là một ngày vui!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => navigate(feature.link)}
              className={`group flex flex-col items-center justify-center p-8 rounded-[2.5rem] cursor-pointer transition-all duration-300 transform hover:-translate-y-3 hover:shadow-2xl border-[6px] border-white shadow-xl ${feature.color} ${feature.hoverColor}`}
            >
              <div className="text-6xl md:text-7xl mb-4 group-hover:scale-125 transition-transform duration-300 ease-in-out">
                {feature.icon}
              </div>
              <h3 className={`text-xl md:text-2xl font-extrabold text-center mb-2 drop-shadow-sm ${feature.textColor}`}>
                {feature.title}
              </h3>
              <p className="text-center font-bold opacity-80 text-sm md:text-base">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to action lớn */}
      <div className="mt-16 text-center z-10">
        <button
          onClick={() => navigate('/login')}
          className="bg-[#EB7470] hover:bg-[#d85e5a] text-white text-2xl md:text-3xl font-extrabold px-12 py-5 rounded-full shadow-[0_8px_0_#b53b37] hover:shadow-[0_4px_0_#b53b37] hover:translate-y-1 transition-all cursor-pointer"
        >
          Bắt đầu học ngay! 🚀
        </button>
      </div>
    </div>
  );
};

export default Home;