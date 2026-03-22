import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { message, Drawer } from 'antd';
import { Menu, LogIn, UserPlus, LogOut, GraduationCap, X } from 'lucide-react'; // Cần cài: npm install lucide-react
import logoImg from '../../assets/logo_vienkey.png';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    message.success('Đã đăng xuất thành công!');
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Giới thiệu', path: '/' },
    { label: 'Chương trình', path: '/chuong-trinh-hoc' },
    { label: 'Tin tức', path: '/tin-tuc' },
    { label: 'Hướng dẫn', path: '/huong-dan' },
  ];

  return (
    <header className="w-full bg-[#61B543] sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-3">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center shrink-0">
          <div className="bg-white p-1 rounded-xl shadow-sm">
            <img src={logoImg} alt="VienKey Logo" className="h-10 md:h-12 w-auto object-contain" />
          </div>
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden lg:flex items-center space-x-6 text-[18px] xl:text-[20px] font-bold text-white">
          {navLinks.map((link, index) => (
            <Link key={index} to={link.path} className="hover:text-amber-100 transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CỤM NÚT BẤM & MOBILE ACTIONS */}
        <div className="flex items-center gap-2 md:gap-3">
          {isLoggedIn ? (
            <>
              {/* Avatar người dùng */}
              <div 
                className="flex items-center gap-2 cursor-pointer bg-white/20 p-1 pr-3 rounded-full hover:bg-white/30 transition-all"
                onClick={() => navigate('/ca-nhan')}
              >
                <div className="w-9 h-9 rounded-full bg-[#EB7470] flex items-center justify-center text-white font-bold border-2 border-white shadow-sm">
                  {user?.fullname ? user.fullname.charAt(0).toUpperCase() : '👤'}
                </div>
                <span className="hidden md:block font-bold text-white max-w-[100px] truncate">
                  Hi, {user?.fullname?.split(' ').pop()}
                </span>
              </div>
              
              {/* Nút học ngay (Desktop) */}
              <button
                className="hidden sm:block bg-[#EB7470] hover:bg-[#d85e5a] text-white font-extrabold px-4 py-2 rounded-full shadow-[0_4px_0_#b53b37] active:translate-y-1 active:shadow-none transition-all border-none cursor-pointer"
                onClick={() => navigate('/danh-sach-lop')}
              >
                Học ngay! 🚀
              </button>
            </>
          ) : (
            <>
              {/* Login/Register: Chuyển thành Icon trên Mobile (< 640px) */}
              <button
                className="bg-white text-[#61B543] font-extrabold p-2.5 sm:px-5 sm:py-2 rounded-full shadow-[0_4px_0_#41802b] active:translate-y-1 active:shadow-none transition-all border-none cursor-pointer flex items-center gap-2"
                onClick={() => navigate('/login')}
                title="Đăng nhập"
              >
                <LogIn size={20} />
                <span className="hidden sm:inline">Đăng nhập</span>
              </button>
              
              <button
                className="bg-[#EB7470] text-white font-extrabold p-2.5 sm:px-5 sm:py-2 rounded-full shadow-[0_4px_0_#b53b37] active:translate-y-1 active:shadow-none transition-all border-none cursor-pointer flex items-center gap-2"
                onClick={() => navigate('/register')}
                title="Đăng ký"
              >
                <UserPlus size={20} />
                <span className="hidden sm:inline">Đăng ký</span>
              </button>
            </>
          )}

          {/* NÚT HAMBURGER MOBILE */}
          <button 
            className="lg:hidden p-2 text-white hover:bg-white/20 rounded-lg transition-all border-none bg-transparent cursor-pointer"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={32} />
          </button>
        </div>
      </div>

      {/* DRAWER MENU CHO MOBILE */}
      <Drawer
        title={
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="Logo" className="h-8" />
            <span className="text-[#61B543] font-black">VIENKEY</span>
          </div>
        }
        placement="right"
        onClose={() => setIsMobileMenuOpen(false)}
        open={isMobileMenuOpen}
        width={280}
        closeIcon={<X className="text-gray-500" />}
      >
        <div className="flex flex-col h-full">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link, index) => (
              <Link 
                key={index} 
                to={link.path} 
                className="text-xl font-bold text-gray-700 hover:text-[#61B543] py-2 border-b border-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {isLoggedIn && (
              <button
                className="w-full bg-[#EB7470] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 mt-4"
                onClick={() => { navigate('/danh-sach-lop'); setIsMobileMenuOpen(false); }}
              >
                <GraduationCap /> Bắt đầu học ngay!
              </button>
            )}
          </nav>

          <div className="mt-auto pb-6">
            {isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 text-red-500 font-bold py-3 border-2 border-red-500 rounded-xl hover:bg-red-50"
              >
                <LogOut size={20} /> Đăng xuất
              </button>
            ) : (
              <p className="text-center text-gray-400 text-sm italic">Chào mừng bạn đến với VienKey!</p>
            )}
          </div>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;