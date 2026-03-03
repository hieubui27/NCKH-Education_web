import React from 'react';
import { Breadcrumb, Layout, Input, Spin, theme } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import AppSiderMenu from '../components/Menu/Menu';
import logoImg from '../assets/logo_vienkey.png';
import AppFooter from '../components/Footer/AppFooter';

const { Header, Content } = Layout;

const AppLayout = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [suggestions, setSuggestions] = React.useState({ themes: [], lessons: [] });
  const [searchLoading, setSearchLoading] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const searchTimeoutRef = React.useRef(null);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();

  const handleFetchSuggestions = React.useCallback(async (keyword) => {
    if (!keyword || keyword.trim() === '') {
      setSuggestions({ themes: [], lessons: [] });
      setShowDropdown(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      setSearchLoading(true);
      const res = await fetch(`http://localhost:5000/api/lessons/search?q=${encodeURIComponent(keyword)}`, {
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
        });
        setShowDropdown(true);
      } else {
        setSuggestions({ themes: [], lessons: [] });
        setShowDropdown(false);
      }
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error);
      setSuggestions({ themes: [], lessons: [] });
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
    // Giả định theme.id tương ứng với topicId, class/term mặc định
    navigate(`/danh-sach-lop/lop-2/ky/1/chu-de/${theme.id}`);
  };

  const handleSelectLesson = (lesson) => {
    setShowDropdown(false);
    setSearchTerm('');
    // Tạm thời điều hướng đến trang chi tiết bài học với tham số mặc định
    navigate(`/danh-sach-lop/lop-2/ky/1/chu-de/1/bai-hoc/${lesson.id}`);
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
          <img
            src={logoImg}
            alt="VienKey Logo"
            className="h-10 w-auto object-contain mix-blend-multiply"
          />
        </Link>
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div className="relative flex items-center w-[350px] md:w-[450px]">
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
                  if ((suggestions.themes?.length || suggestions.lessons?.length) && searchTerm) {
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

            {showDropdown && (suggestions.themes.length > 0 || suggestions.lessons.length > 0) && (
              <div className="absolute top-[110%] left-0 w-full bg-white rounded-2xl shadow-lg border border-gray-100 z-50 max-h-96 overflow-y-auto">
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
                  <div>
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
              </div>
            )}
          </div>
        </div>
        <div style={{ minWidth: 80 }} className="flex justify-end">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-[#814C9D] cursor-pointer">
            {/* Simple user icon SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#814C9D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
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