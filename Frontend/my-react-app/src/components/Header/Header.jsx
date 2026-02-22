import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-[#61B543] text-black flex items-center justify-between px-6 py-6">
      <div className='wrapped max-w-300 w-full mx-auto flex items-center justify-between'>
        <div className="flex items-center space-x-8 ">
        <Link to="/" className="text-white font-bold text-2xl tracking-tight">
          Lgo
        </Link>
        
        {/* Menu điều hướng */}
        
      </div>

      <nav className="hidden md:flex text-[24px] font-medium  space-x-6 text-black">
          <Link to="/" className="hover:text-amber-50 transition-all duration-300 ease-in-out">Giới thiệu</Link>
          <Link to="/" className="hover:text-amber-50 transition-all duration-300 ease-in-out">Chương trình</Link>
          <Link to="/" className="hover:text-amber-50 transition-all duration-300 ease-in-out">Tin tức</Link>
          <Link to="/" className="hover:text-amber-50 transition-all duration-300 ease-in-out">Hướng dẫn</Link>
        </nav>

      {/* Cụm nút bấm bên phải */}
      <div className="flex items-center space-x-3">
        <Button 
          className=" text-brand-green border-none font-bold hover:!text-brand-green-light"
          onClick={() => navigate('/login')}
        >
          Đăng nhập
        </Button>
        <Button 
          ghost 
          className="text-white border-white hover:!border-brand-green-light hover:!text-brand-green-light"
        >
          Đăng ký
        </Button>
      </div>
      </div>
      
    </header>
  );
};

export default Header;