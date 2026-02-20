import { Layout, Menu, Input } from 'antd';
import {
  UserOutlined,
  BookOutlined,
  TranslationOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const AppLayout = () => {
  const location = useLocation();

  const menuItems = [
    {
      key: '/ca-nhan',
      icon: <UserOutlined />,
      label: <Link to="/ca-nhan">Trang cá nhân</Link>,
    },
    {
      key: '/danh-sach-lop',
      icon: <BookOutlined />,
      label: <Link to="/danh-sach-lop">Mục lục</Link>,
    },
    {
      key: '/giai-nghia',
      icon: <TranslationOutlined />,
      label: <Link to="/giai-nghia">Giải nghĩa từ</Link>,
    },
  ];

  // Đặt menu đang chọn theo URL hiện tại
  const selectedKey =
    menuItems.find((item) => location.pathname.startsWith(item.key))?.key ??
    '/ca-nhan';

  return (
    <Layout className="min-h-screen w-full">
      {/* Header phong cách Sách giáo khoa điện tử */}
      <Header
        style={{
          backgroundColor: '#61B543',
          display: 'flex',
          alignItems: 'center',
          paddingInline: 24,
        }}
      >
        <div className="flex items-center w-full gap-6">
          <Link
            to="/"
            className="text-white text-2xl font-extrabold tracking-tight"
          >
            Lgo
          </Link>

          <div className="flex-1 flex justify-center">
            <Input.Search
              placeholder="Tìm kiếm bài học, chương, mục lục..."
              allowClear
              className="max-w-xl w-full rounded-full"
              style={{
                borderRadius: 9999,
                backgroundColor: '#ffffff',
              }}
            />
          </div>

          <div className="w-12" />
        </div>
      </Header>

      <Layout>
        {/* Sidebar điều hướng */}
        <Sider
          width={250}
          style={{
            backgroundColor: '#ffffff',
            borderRight: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            items={menuItems}
            style={{ borderRight: 0, paddingTop: 16 }}
          />
        </Sider>

        {/* Khu vực nội dung bài học */}
        <Content
          style={{
            backgroundColor: '#FFFDEF',
            padding: 0,
            minHeight: 'calc(100vh - 64px)',
            display: 'flex',
          }}
        >
          <div className="bg-white rounded-lg shadow-md p-6 w-full h-full">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;