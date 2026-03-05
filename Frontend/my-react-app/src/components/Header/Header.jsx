import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import logoImg from '../../assets/logo_vienkey.png';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    message.success('Đã đăng xuất thành công!');
    navigate('/');
  };

  return (
    <header className="w-full bg-[#61B543] text-black flex items-center justify-between px-6 py-4">
      <div className='wrapped max-w-300 w-full mx-auto flex items-center justify-between'>
        <div className="flex items-center space-x-8 ">
          <Link to="/" className="flex items-center">
            <div className="bg-white p-1.5 md:p-2 rounded-xl shadow-sm hover:-translate-y-1 transition-transform">
              <img
                src={logoImg}
                alt="VienKey Logo"
                className="h-10 md:h-12 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Menu điều hướng */}

        </div>

        <nav className="hidden md:flex text-[24px] font-medium  space-x-6 text-black">
          <Link to="/" className="hover:text-amber-50 transition-all duration-300 ease-in-out">Giới thiệu</Link>
          <Link to="/chuong-trinh-hoc" className="hover:text-amber-50 transition-all duration-300 ease-in-out">Chương trình</Link>
          <Link to="/tin-tuc" className="hover:text-amber-50 transition-all duration-300 ease-in-out">Tin tức</Link>
          <Link to="/" className="hover:text-amber-50 transition-all duration-300 ease-in-out">Hướng dẫn</Link>
        </nav>

        {/* Cụm nút bấm bên phải */}
        <div className="flex items-center space-x-3">
          {isLoggedIn ? (
            <>
              <div
                className="flex items-center gap-2 cursor-pointer mr-2"
                onClick={() => navigate('/ca-nhan')}
              >
                <div className="w-10 h-10 rounded-full bg-[#EB7470] flex items-center justify-center text-white font-bold text-xl overflow-hidden border-2 border-white shadow-sm hover:scale-105 transition-transform">
                  {user?.fullname ? user.fullname.charAt(0).toUpperCase() : '👤'}
                </div>
                <span className="hidden md:block font-bold text-black max-w-[120px] truncate">
                  {user?.fullname || 'Học sinh'}
                </span>
              </div>
              <button
                className="bg-white text-[#EB7470] font-extrabold text-base px-4 py-2 border-2 border-[#EB7470] rounded-full shadow-sm hover:bg-[#EB7470] hover:text-white transition-all cursor-pointer mr-2"
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
              <button
                className="bg-[#EB7470] hover:bg-[#d85e5a] text-white font-extrabold text-base md:text-lg px-4 md:px-5 py-2 md:py-2.5 rounded-full shadow-[0_4px_0_#b53b37] hover:shadow-[0_2px_0_#b53b37] active:shadow-none active:translate-y-1 transition-all border-none cursor-pointer"
                onClick={() => navigate('/danh-sach-lop')}
              >
                Bắt đầu học ngay! 🚀
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-white text-[#61B543] font-extrabold text-base md:text-lg px-5 py-2 md:px-8 md:py-2.5 rounded-full shadow-[0_4px_0_#41802b] hover:shadow-[0_2px_0_#41802b] hover:translate-y-0.5 transition-all border-none cursor-pointer"
                onClick={() => navigate('/login')}
              >
                Đăng nhập
              </button>
              <button
                className="bg-[#EB7470] text-white font-extrabold text-base md:text-lg px-5 py-2 md:px-8 md:py-2.5 rounded-full shadow-[0_4px_0_#b53b37] hover:shadow-[0_2px_0_#b53b37] hover:translate-y-0.5 transition-all border-none cursor-pointer"
                onClick={() => navigate('/register')}
              >
                Đăng ký
              </button>
            </>
          )}
        </div>
      </div>

    </header>
  );
};

export default Header;