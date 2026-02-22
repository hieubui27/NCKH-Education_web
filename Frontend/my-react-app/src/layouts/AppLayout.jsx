import { Breadcrumb, Layout, Input, theme } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import AppSiderMenu from '../components/Menu/Menu';

const { Header, Content } = Layout;

const AppLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();

  return (
    <Layout>
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
          className="text-white text-2xl font-extrabold tracking-tight"
          style={{ minWidth: 80 }}
        >
          Lgo
        </Link>
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Input.Search
            placeholder="Tìm kiếm bài học, chương, mục lục..."
            allowClear
            className="max-w-xl"
            style={{
              borderRadius: 9999,
              backgroundColor: '#ffffff',
              width: 350,
            }}
          />
        </div>
        <div style={{ minWidth: 80 }} />
      </Header>

      <Layout>
        <AppSiderMenu />
        <Layout style={{ padding: '0 24px 24px' }}>
          
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;