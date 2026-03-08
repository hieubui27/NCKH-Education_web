import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Layout, Spin, theme, message, Drawer } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { SearchOutlined, UserOutlined, MenuOutlined, CloseOutlined, ArrowLeftOutlined } from '@ant-design/icons';
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
  const [isSearchExpanded, setIsSearchExpanded] = useState(false); 
  
  const searchTimeoutRef = useRef(null);
  const dropdownRef = useRef(null);
  const { user, isLoggedIn, logout } = useAuth();
  const { token: { borderRadiusLG } } = theme.useToken();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      <Header className="sticky top-0 z-[1000] flex items-center h-[64px] bg-[#61B543] px-4 md:px-6 w-full border-none shadow-sm">
        
        {/* TRẠNG THÁI 1: HEADER BÌNH THƯỜNG */}
        {!isSearchExpanded ? (
          <div className="flex items-center justify-between w-full animate-in fade-in duration-300">
            {/* Nhóm trái: Hamburger + Logo */}
            <div className="flex items-center gap-3">
              <button 
                className="lg:hidden bg-transparent border-none text-white text-xl cursor-pointer flex items-center"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <MenuOutlined />
              </button>
              <Link to="/" className="shrink-0 bg-white p-1 rounded-lg shadow-sm flex items-center">
                <img src={logoImg} alt="VienKey" className="h-8 md:h-9 w-auto object-contain" />
              </Link>
            </div>

            {/* Nhóm giữa: Search cho Desktop */}
            <div className="hidden md:flex flex-1 justify-center max-w-lg mx-8" ref={dropdownRef}>
              <div className="relative w-full">
                <div className="flex items-center bg-white rounded-full px-4 py-1.5 shadow-sm border border-transparent focus-within:border-green-200 transition-all">
                  <SearchOutlined className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm bài học..."
                    className="w-full bg-transparent outline-none text-sm text-gray-700"
                    value={searchTerm}
                    onChange={handleChangeSearch}
                    onFocus={() => searchTerm && setShowDropdown(true)}
                  />
                  {searchLoading && <Spin size="small" className="ml-2" />}
                </div>
                {/* Dropdown Suggestions Desktop */}
                {showDropdown && (suggestions.themes.length > 0 || suggestions.lessons.length > 0) && (
                  <div className="absolute top-full mt-2 left-0 w-full bg-white rounded-xl shadow-2xl border border-gray-100 z-[1001] max-h-80 overflow-y-auto p-2">
                     {/* Render suggestions map ở đây */}
                  </div>
                )}
              </div>
            </div>

            {/* Nhóm phải: Search Icon (Mobile) + Auth */}
            <div className="flex items-center gap-3">
              <button 
                className="md:hidden bg-transparent border-none text-white text-xl cursor-pointer"
                onClick={() => setIsSearchExpanded(true)}
              >
                <SearchOutlined />
              </button>

              {isLoggedIn ? (
                <div 
                  className="w-9 h-9 rounded-full bg-[#EB7470] flex items-center justify-center text-white font-bold border-2 border-white shadow-sm cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => navigate('/ca-nhan')}
                >
                  {user?.fullname?.charAt(0).toUpperCase() || <UserOutlined />}
                </div>
              ) : (
                <button 
                  className="bg-white text-[#61B543] font-bold px-4 py-1.5 rounded-full border-none text-sm cursor-pointer hover:bg-gray-50"
                  onClick={() => navigate('/login')}
                >
                  Đăng nhập
                </button>
              )}
            </div>
          </div>
        ) : (
          /* TRẠNG THÁI 2: SEARCH FULL-SCREEN TRÊN MOBILE */
          <div className="flex items-center w-full gap-3 animate-in slide-in-from-top-2 duration-300">
            <button 
              className="bg-transparent border-none text-white text-xl"
              onClick={() => {
                setIsSearchExpanded(false);
                setShowDropdown(false);
              }}
            >
              <ArrowLeftOutlined />
            </button>
            <div className="flex-1 flex items-center bg-white rounded-full px-4 py-2 shadow-inner" ref={dropdownRef}>
              <input
                autoFocus
                type="text"
                placeholder="Tìm bài học, chủ đề..."
                className="w-full bg-transparent outline-none text-base text-gray-700"
                value={searchTerm}
                onChange={handleChangeSearch}
              />
              {searchTerm && <CloseOutlined className="text-gray-400 ml-2" onClick={() => setSearchTerm('')} />}
            </div>
          </div>
        )}
      </Header>

      <Layout hasSider>
        <Sider
          width={250}
          theme="light"
          className="hidden lg:block border-r border-gray-100 sticky top-[64px] h-[calc(100vh-64px)] overflow-y-auto"
        >
          <AppSiderMenu />
        </Sider>

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