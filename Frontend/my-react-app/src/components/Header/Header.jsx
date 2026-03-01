import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import logoImg from '../../assets/logo_vienkey.png';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-[#61B543] text-black flex items-center justify-between px-6 py-4">
      <div className='wrapped max-w-300 w-full mx-auto flex items-center justify-between'>
        <div className="flex items-center space-x-8 ">
          <Link to="/" className="flex items-center">
            <img
              src={logoImg}
              alt="VienKey Logo"
              className="h-12 w-auto object-contain mix-blend-multiply"
            />
          </Link>

          {/* Menu điều hướng */}

        </div>

        <nav className="hidden md:flex text-[24px] font-medium  space-x-6 text-black">
          <Link to="/" className="hover:text-amber-50 transition-all duration-300 ease-in-out">Giới thiệu</Link>
          <Link to="/" className="hover:text-amber-50 transition-all duration-300 ease-in-out">Chương trình</Link>
          <Link to="/tin-tuc" className="hover:text-amber-50 transition-all duration-300 ease-in-out">Tin tức</Link>
          <Link to="/" className="hover:text-amber-50 transition-all duration-300 ease-in-out">Hướng dẫn</Link>
        </nav>

        {/* Cụm nút bấm bên phải */}
        <div className="flex items-center space-x-3">
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
        </div>
      </div>

    </header>
  );
};

export default Header;