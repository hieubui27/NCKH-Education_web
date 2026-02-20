import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const MainLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-ivory font-sans flex flex-col">
      <header className="bg-brand-green h-16 flex items-center justify-between px-6 shadow-md">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-white font-bold text-2xl tracking-tight">
            Lgo
          </Link>
          
          {/* Menu điều hướng */}
          <nav className="hidden md:flex space-x-6 text-white font-medium">
            <Link to="/" className="hover:opacity-80">Giới thiệu</Link>
            <Link to="/" className="hover:opacity-80">Chương trình</Link>
            <Link to="/" className="hover:opacity-80">Tin tức</Link>
            <Link to="/" className="hover:opacity-80">Hướng dẫn</Link>
          </nav>
        </div>

        {/* Cụm nút bấm bên phải */}
        <div className="flex items-center space-x-3">
          <Button 
            className="bg-brand-white text-brand-green border-none font-bold hover:!text-brand-green-light"
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
      </header>

      {/* Nội dung thay đổi tùy theo trang (Home hoặc Login) */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;