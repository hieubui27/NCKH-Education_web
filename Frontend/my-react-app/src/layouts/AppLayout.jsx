import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Layout, Input, Spin, theme, message } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import AppSiderMenu from '../components/Menu/Menu';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/logo_vienkey.png';
import AppFooter from '../components/Footer/AppFooter';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

const AppLayout = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState({ themes: [], lessons: [], words: [] });
  const [searchLoading, setSearchLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchTimeoutRef = useRef(null);
  const dropdownRef = useRef(null);

  const { user, isLoggedIn, logout } = useAuth();

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    message.success('Đã đăng xuất thành công!');
    navigate('/');
  };

  const handleFetchSuggestions = useCallback(async (keyword) => {
    if (!keyword || keyword.trim() === '') {
      setSuggestions({ themes: [], lessons: [], words: [] });
      setShowDropdown(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      setSearchLoading(true);
      const res = await fetch(`/api/lessons/search?q=${encodeURIComponent(keyword)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      const data = await res.json();
      if (data.success && data.data) {
        setSuggestions({
          themes: data.data.themes || [],
          lessons: data.data.lessons || [],
          words: data.data.words || [],
        });
        setShowDropdown(true);
      } else {
        setSuggestions({ themes: [], lessons: [], words: [] });
        setShowDropdown(false);
      }
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error);
      setShowDropdown(false);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  const handleChangeSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      handleFetchSuggestions(value);
    }, 400);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    handleFetchSuggestions(searchTerm);
  };

  const handleSelectTheme = (theme) => {
    setShowDropdown(false);
    setSearchTerm('');
    navigate(`/danh-sach-lop/lop-2/ky/1/chu-de/${theme.id}`);
  };

  const handleSelectLesson = (lesson) => {
    setShowDropdown(false);
    setSearchTerm('');
    navigate(`/danh-sach-lop/lop-2/ky/1/chu-de/1/bai-hoc/${lesson.id}`);
  };

  const handleSelectWord = (word) => {
    setShowDropdown(false);
    setSearchTerm(word.word);
    navigate(`/danh-sach-lop/lop-2/ky/1/chu-de/1/bai-hoc/1/tu-vung/${word.id}`);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          background: '#61B543',
          paddingInline: 24,
          height: '72px'
        }}
      >
        <Link to="/" className="flex items-center mr-6" style={{ minWidth: 80 }}>
          <div className="bg-white p-1.5 rounded-xl shadow-sm hover:-translate-y-1 transition-transform">
            <img src={logoImg} alt="VienKey Logo" className="h-10 w-auto object-contain" />
          </div>
        </Link>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div className="relative flex items-center w-87.5 md:w-112.5" ref={dropdownRef}>
            <form
              onSubmit={handleSubmitSearch}
              className="flex items-center w-full bg-white rounded-full shadow-sm"
            >
              <input
                type="text"
                placeholder="Tìm kiếm bài học, chủ đề..."
                className="flex-1 bg-transparent px-6 py-3 text-base outline-none text-gray-700 font-sans"
                value={searchTerm}
                onChange={handleChangeSearch}
                onFocus={() => {
                  if ((suggestions.themes?.length || suggestions.lessons?.length || suggestions.words?.length) && searchTerm) {
                    setShowDropdown(true);
                  }
                }}
              />
              <div className="h-7 w-px bg-gray-300 mx-2"></div>
              <button
                type="submit"
                className="pr-5 pl-2 py-3 flex items-center justify-center bg-transparent border-none cursor-pointer text-gray-600 hover:text-black transition-colors"
              >
                {searchLoading ? <Spin size="small" /> : <SearchOutlined style={{ fontSize: '20px' }} />}
              </button>
            </form>

            {showDropdown && (suggestions.themes.length > 0 || suggestions.lessons.length > 0 || suggestions.words.length > 0) && (
              <div className="absolute top-[115%] left-0 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 z-[999] max-h-96 overflow-y-auto p-2">
                {suggestions.themes.length > 0 && (
                  <div className="mb-2">
                    <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Chủ đề</div>
                    {suggestions.themes.map((theme) => (
                      <button
                        key={theme.id}
                        className="w-full text-left px-4 py-3 hover:bg-green-50 rounded-xl transition-colors flex items-center gap-3"
                        onClick={() => handleSelectTheme(theme)}
                      >
                        <span className="h-8 w-8 flex items-center justify-center rounded-full bg-green-100 text-green-600 font-bold">T</span>
                        <span className="text-gray-700 font-medium">{theme.theme_name || theme.title}</span>
                      </button>
                    ))}
                  </div>
                )}

                {suggestions.lessons.length > 0 && (
                  <div className="mb-2">
                    <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Bài học</div>
                    {suggestions.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        className="w-full text-left px-4 py-3 hover:bg-blue-50 rounded-xl transition-colors flex items-center gap-3"
                        onClick={() => handleSelectLesson(lesson)}
                      >
                        <span className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">B</span>
                        <div className="flex flex-col">
                          <span className="text-gray-700 font-medium">{lesson.title}</span>
                          {lesson.author && <span className="text-xs text-gray-400">Tác giả: {lesson.author}</span>}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {suggestions.words.length > 0 && (
                  <div>
                    <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Từ vựng</div>
                    <div className="px-3 pb-3 flex flex-wrap gap-2">
                      {suggestions.words.map((word) => (
                        <button
                          key={word.id}
                          className="px-4 py-1.5 bg-orange-50 text-orange-600 hover:bg-orange-100 rounded-full text-sm font-bold border border-orange-100 transition-all"
                          onClick={() => handleSelectWord(word)}
                        >
                          {word.word}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div style={{ minWidth: 80 }} className="flex justify-end items-center space-x-4">
          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/ca-nhan')}>
                <div className="w-10 h-10 rounded-full bg-[#EB7470] flex items-center justify-center text-white font-bold border-2 border-white shadow-sm hover:scale-110 transition-transform">
                  {user?.fullname ? user.fullname.charAt(0).toUpperCase() : <UserOutlined />}
                </div>
                <span className="hidden lg:block font-bold text-white truncate max-w-[100px]">{user?.fullname || 'Học sinh'}</span>
              </div>
              <button
                className="bg-[#FF8E7E] text-white font-black text-sm px-5 py-2.5 rounded-full shadow-[0_4px_0_#e57a6b] hover:shadow-[0_2px_0_#e57a6b] hover:translate-y-0.5 active:translate-y-1 transition-all border-none cursor-pointer"
                onClick={() => navigate('/danh-sach-lop')}
              >
                HỌC NGAY! 🚀
              </button>

              {/* Nút Thoát - Màu đỏ nhạt pastel, viền mảnh */}
              <button
                className="bg-[#FFF1F0] text-[#FF7875] font-bold text-sm px-4 py-2.5 rounded-full border border-[#FFA39E] hover:bg-[#FF7875] hover:text-white transition-all cursor-pointer"
                onClick={handleLogout}
              >
                Thoát
              </button>
            </>
          ) : (
            <>
              <button className="bg-white text-[#61B543] font-bold px-6 py-2 rounded-full hover:scale-105 transition-all border-none cursor-pointer" onClick={() => navigate('/login')}>Đăng nhập</button>
              <button className="bg-[#EB7470] text-white font-bold px-6 py-2 rounded-full hover:scale-105 transition-all border-none cursor-pointer shadow-lg" onClick={() => navigate('/register')}>Đăng ký</button>
            </>
          )}
        </div>
      </Header>

      <Layout>
        <AppSiderMenu />
        <Layout>
          <Content style={{ margin: 0, minHeight: 280, background: '#FFFDEF', borderRadius: borderRadiusLG }}>
            <Outlet />
          </Content>
          <AppFooter />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;