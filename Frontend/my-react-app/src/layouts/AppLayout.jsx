import React from 'react';
import { Breadcrumb, Layout, Input, Spin, theme, message } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import AppSiderMenu from '../components/Menu/Menu';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/logo_vienkey.png';
import AppFooter from '../components/Footer/AppFooter';

const { Header, Content } = Layout;

const AppLayout = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [suggestions, setSuggestions] = React.useState({ themes: [], lessons: [], words: [] });
  const [searchLoading, setSearchLoading] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const searchTimeoutRef = React.useRef(null);

  const { user, isLoggedIn, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    message.success('Đã đăng xuất thành công!');
    navigate('/');
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();

  const handleFetchSuggestions = React.useCallback(async (keyword) => {
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
        credentials: 'include',
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
      setSuggestions({ themes: [], lessons: [], words: [] });
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
        }}
      >
        <Link
          to="/"
          className="flex items-center mr-6"
          style={{ minWidth: 80 }}
        >
          <div className="bg-white p-1 md:p-1.5 rounded-xl shadow-sm hover:-translate-y-1 transition-transform">
            <img
              src={logoImg}
              alt="VienKey Logo"
              className="h-10 w-auto object-contain"
            />
          </div>
        </Link>
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div className="relative flex items-center w-87.5 md:w-112.5">
            <form
              onSubmit={handleSubmitSearch}
              className="flex items-center w-full bg-white rounded-full shadow-sm"
            >
              <input
                type="text"
                placeholder="Tìm kiếm bài học, chủ đề..."
                className="flex-1 bg-transparent px-6 py-3 text-base md:text-[17px] outline-none text-gray-700 font-sans"
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
                className="pr-5 pl-2 py-3 flex items-center justify-center bg-transparent border-none cursor-pointer text-gray-600 hover:text-black transition-colors outline-none"
              >
                {searchLoading ? (
                  <Spin size="small" />
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                )}
              </button>
            </form>

            {showDropdown && (suggestions.themes.length > 0 || suggestions.lessons.length > 0 || suggestions.words.length > 0) && (
              <div className="absolute top-[110%] left-0 w-full bg-white rounded-2xl shadow-lg border border-gray-100 z-999 max-h-96 overflow-y-auto">
                {suggestions.themes.length > 0 && (
                  <div className="border-b border-gray-100">
                    <div className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-500 uppercase">
                      Chủ đề
                    </div>
                    {suggestions.themes.map((theme) => (
                      <button
                        key={theme.id}
                        type="button"
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-800 flex items-center gap-2"
                        onClick={() => handleSelectTheme(theme)}
                      >
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 text-xs font-bold">
                          T
                        </span>
                        <span>{theme.theme_name || theme.title}</span>
                      </button>
                    ))}
                  </div>
                )}

                {suggestions.lessons.length > 0 && (
                  <div className="border-b border-gray-100">
                    <div className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-500 uppercase">
                      Bài học
                    </div>
                    {suggestions.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        type="button"
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-800 flex items-start gap-2"
                        onClick={() => handleSelectLesson(lesson)}
                      >
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold mt-0.5">
                          B
                        </span>
                        <span className="flex flex-col">
                          <span className="font-semibold">{lesson.title}</span>
                          {lesson.author && (
                            <span className="text-xs text-gray-500">Tác giả: {lesson.author}</span>
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {suggestions.words.length > 0 && (
                  <div>
                    <div className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-500 uppercase">
                      Từ vựng
                    </div>
                    <div className="px-4 pb-3 flex flex-wrap gap-2">
                      {suggestions.words.map((word) => (
                        <button
                          key={word.id}
                          type="button"
                          className="px-3 py-1 bg-orange-50 text-orange-600 hover:bg-orange-100 rounded-full text-sm border border-orange-100 transition-colors"
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
        <div style={{ minWidth: 80 }} className="flex justify-end items-center space-x-3">
          {isLoggedIn ? (
            <>
              <div
                className="flex items-center gap-2 cursor-pointer mr-2 md:mr-4"
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
                className="bg-[#EB7470] hover:bg-[#d85e5a] text-white font-extrabold text-base px-4 py-2 rounded-full shadow-[0_4px_0_#41802b] hover:shadow-[0_2px_0_#41802b] hover:translate-y-0.5 transition-all border-none cursor-pointer"
                onClick={() => navigate('/danh-sach-lop')}
              >
                Bắt đầu học ngay! 🚀
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-white text-[#61B543] font-extrabold text-base px-4 py-2 rounded-full shadow-[0_4px_0_#41802b] hover:shadow-[0_2px_0_#41802b] hover:translate-y-0.5 transition-all border-none cursor-pointer hidden md:block"
                onClick={() => navigate('/login')}
              >
                Đăng nhập
              </button>
              <button
                className="bg-[#EB7470] text-white font-extrabold text-base px-4 py-2 rounded-full shadow-[0_4px_0_#b53b37] hover:shadow-[0_2px_0_#b53b37] hover:translate-y-0.5 transition-all border-none cursor-pointer"
                onClick={() => navigate('/register')}
              >
                Đăng ký
              </button>
            </>
          )}
        </div>
      </Header>

      <Layout>
        <AppSiderMenu />
        <Layout >
          <Content
            style={{
              margin: 0,
              minHeight: 280,
              background: '#FFFDEF',
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
          <AppFooter />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;