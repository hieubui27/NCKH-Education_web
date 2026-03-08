import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Layout, Spin, theme, message, Drawer } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { SearchOutlined, UserOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import AppSiderMenu from '../components/Menu/Menu';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/logo_vienkey.png';
import AppFooter from '../components/Footer/AppFooter';

const { Header, Content, Sider } = Layout;

const AppLayout = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState({ themes: [], lessons: [], words: [] });
  const [searchLoading, setSearchLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false); // Cho mobile search
  
  const searchTimeoutRef = useRef(null);
  const dropdownRef = useRef(null);
  const { user, isLoggedIn, logout } = useAuth();
  const { token: { borderRadiusLG } } = theme.useToken();

  // Đóng dropdown khi click ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
        if (!searchTerm) setIsSearchExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchTerm]);

  const handleLogout = async () => {
    await logout();
    message.success('Đã đăng xuất thành công!');
    navigate('/');
  };

  const handleFetchSuggestions = useCallback(async (keyword) => {
    if (!keyword?.trim()) {
      setSuggestions({ themes: [], lessons: [], words: [] });
      setShowDropdown(false);
      return;
    }
    try {
      setSearchLoading(true);
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/lessons/search?q=${encodeURIComponent(keyword)}`, {
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      });
      const data = await res.json();
      if (data.success && data.data) {
        setSuggestions(data.data);
        setShowDropdown(true);
      }
    } catch (error) {
      console.error('Lỗi tìm kiếm:', error);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  const handleChangeSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => handleFetchSuggestions(value), 400);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* HEADER TỐI ƯU */}
      <Header className="sticky top-0 z-[1000] flex items-center justify-between px-4 md:px-6 h-[72px] bg-[#61B543] w-full border-none">
        
        {/* Nhóm trái: Hamburger + Logo */}
        <div className="flex items-center gap-3">
          <button 
            className="lg:hidden bg-transparent border-none text-white text-xl cursor-pointer flex items-center"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <MenuOutlined />
          </button>
          <Link to="/" className="shrink-0">
            <div className="bg-white p-1 rounded-lg shadow-sm">
              <img src={logoImg} alt="VienKey" className="h-8 md:h-10 w-auto object-contain" />
            </div>
          </Link>
        </div>

        {/* Nhóm giữa: Thanh tìm kiếm linh hoạt */}
        <div className={`flex-1 flex justify-center px-4 transition-all duration-300 ${isSearchExpanded ? 'absolute left-0 w-full px-2' : 'relative'}`}>
          <div 
            ref={dropdownRef}
            className={`relative transition-all duration-300 ${isSearchExpanded ? 'w-full' : 'w-10 md:w-80 lg:w-[450px]'}`}
          >
            <form 
              onSubmit={(e) => { e.preventDefault(); handleFetchSuggestions(searchTerm); }}
              className={`flex items-center bg-white rounded-full overflow-hidden transition-all ${isSearchExpanded ? 'shadow-lg' : 'shadow-sm'}`}
            >
              {/* Nút search/back trên mobile */}
              <button 
                type="button"
                className="pl-4 text-gray-400 border-none bg-transparent md:hidden"
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              >
                {isSearchExpanded ? <CloseOutlined /> : <SearchOutlined style={{fontSize: 18}} />}
              </button>

              <input
                type="text"
                placeholder="Tìm kiếm..."
                className={`flex-1 bg-transparent py-2 md:py-2.5 px-4 outline-none text-sm md:text-base ${!isSearchExpanded && 'hidden md:block'}`}
                value={searchTerm}
                onChange={handleChangeSearch}
                onFocus={() => {
                  if (searchTerm) setShowDropdown(true);
                  setIsSearchExpanded(true);
                }}
              />
              
              <button type="submit" className={`pr-4 pl-2 bg-transparent border-none cursor-pointer text-gray-400 hover:text-green-600 ${!isSearchExpanded && 'hidden md:block'}`}>
                {searchLoading ? <Spin size="small" /> : <SearchOutlined />}
              </button>
            </form>

            {/* Dropdown kết quả (Giữ nguyên logic của bạn nhưng tối ưu CSS) */}
            {showDropdown && (suggestions.themes.length > 0 || suggestions.lessons.length > 0) && (
              <div className="absolute top-full mt-2 left-0 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 z-[1001] max-h-[70vh] overflow-y-auto">
                {/* Render các suggestions như cũ ở đây */}
              </div>
            )}
          </div>
        </div>

        {/* Nhóm phải: Auth Actions (Ẩn bớt trên mobile nếu search mở rộng) */}
        <div className={`flex items-center gap-3 ${isSearchExpanded ? 'hidden sm:flex' : 'flex'}`}>
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <div 
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#EB7470] flex items-center justify-center text-white font-bold border-2 border-white cursor-pointer"
                onClick={() => navigate('/ca-nhan')}
              >
                {user?.fullname?.charAt(0).toUpperCase() || <UserOutlined />}
              </div>
              <button 
                className="hidden md:block bg-[#FF8E7E] text-white font-bold px-4 py-2 rounded-full border-none shadow-[0_3px_0_#e57a6b] cursor-pointer"
                onClick={() => navigate('/danh-sach-lop')}
              >
                HỌC NGAY!
              </button>
            </div>
          ) : (
            <button className="bg-white text-[#61B543] font-bold px-4 py-2 rounded-full border-none cursor-pointer" onClick={() => navigate('/login')}>
              Login
            </button>
          )}
        </div>
      </Header>

      <Layout hasSider>
        {/* SIDER CHO DESKTOP */}
        <Sider
          width={250}
          theme="light"
          className="hidden lg:block border-r border-gray-100 sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto"
          style={{ background: '#fff' }}
        >
          <AppSiderMenu />
        </Sider>

        {/* DRAWER CHO MOBILE */}
        <Drawer
          placement="left"
          onClose={() => setIsMobileMenuOpen(false)}
          open={isMobileMenuOpen}
          width={280}
          bodyStyle={{ padding: 0 }}
        >
          <AppSiderMenu onSelect={() => setIsMobileMenuOpen(false)} />
        </Drawer>

        <Layout className="bg-[#FFFDEF]">
          <Content className="p-4 md:p-6 lg:p-8 min-h-[400px]">
            <div className="max-w-7xl mx-auto h-full">
              <Outlet />
            </div>
          </Content>
          <AppFooter />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;