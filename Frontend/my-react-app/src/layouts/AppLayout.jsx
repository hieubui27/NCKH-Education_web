import { Breadcrumb, Layout, Input, theme } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import AppSiderMenu from '../components/Menu/Menu';
import logoImg from '../assets/logo_vienkey.png';
import AppFooter from '../components/Footer/AppFooter';

const { Header, Content } = Layout;

const AppLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();

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
          <div className="flex items-center w-[350px] md:w-[450px] bg-white rounded-full shadow-sm">
            <input
              type="text"
              placeholder="Tìm kiếm bài học, chương, mục lục..."
              className="flex-1 bg-transparent px-6 py-3 text-base md:text-[17px] outline-none text-gray-700 font-sans"
            />
            <div className="h-7 w-px bg-gray-300 mx-2"></div>
            <button className="pr-5 pl-2 py-3 flex items-center justify-center bg-transparent border-none cursor-pointer text-gray-600 hover:text-black transition-colors outline-none">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
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