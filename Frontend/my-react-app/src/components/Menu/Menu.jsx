import React, { useState, useEffect } from 'react';
import { Layout, Menu, ConfigProvider, Spin } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import { 
  UserOutlined, 
  ReadOutlined, 
  SmileOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const AppSiderMenu = () => {
  const location = useLocation();
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openKeys, setOpenKeys] = useState(['/danh-sach-lop', '/danh-sach-lop/lop-2', '/danh-sach-lop/lop-2/ky/2']);

  useEffect(() => {
    const fetchRealData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const res = await fetch('/api/lessons', {
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });
        const data = await res.json();
        if (data.success) {
          setThemes(data.data || []);
        }
      } catch (error) {
        console.error('Lỗi tải dữ liệu menu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRealData();
  }, []);

  // Helper render label bọc Link để có thể nhấn vào Header Menu
  const renderLinkStyle = (path, text, weight = "font-extrabold") => (
    <Link to={path} style={{ display: 'block', width: '100%', color: 'inherit', textDecoration: 'none' }}>
      <span className={`${weight} text-black text-[16px]`}>{text}</span>
    </Link>
  );

  const menuItems = [
    {
      key: '/huong-dan',
      icon: <QuestionCircleOutlined />,
      label: renderLinkStyle('/huong-dan', 'Hướng dẫn sử dụng'),
    },
    {
      key: '/ca-nhan',
      icon: <UserOutlined />,
      label: renderLinkStyle('/ca-nhan', 'Trang cá nhân'),
    },
    {
      key: '/danh-sach-lop',
      icon: <ReadOutlined />,
      label: renderLinkStyle('/danh-sach-lop', 'Mục lục'),
      children: [
        {
          key: '/danh-sach-lop/lop-2',
          label: renderLinkStyle('/danh-sach-lop/lop-2', 'Lớp 2'),
          children: [
            { 
              key: '/danh-sach-lop/lop-2/ky/1', 
              label: renderLinkStyle('/danh-sach-lop/lop-2/ky/1', 'Học kỳ I', "font-bold text-gray-400 italic") 
            },
            {
              key: '/danh-sach-lop/lop-2/ky/2',
              label: renderLinkStyle('/danh-sach-lop/lop-2/ky/2', 'Học kỳ II'),
              children: loading ? [
                { key: 'loading', label: <Spin size="small" className="ml-4" /> }
              ] : themes.map((theme) => ({
                key: `/danh-sach-lop/lop-2/ky/2/chu-de/${theme.id}`,
                label: (
                  <Link to={`/danh-sach-lop/lop-2/ky/2/chu-de/${theme.id}`}>
                    <span className="text-sm font-semibold text-gray-600 hover:text-[#61B543]">
                      {theme.title}
                    </span>
                  </Link>
                ),
                icon: <SmileOutlined style={{ fontSize: '12px' }} />
              })),
            },
          ],
        },
        { key: '/danh-sach-lop/lop-3', label: renderLinkStyle('/danh-sach-lop/lop-3', 'Lớp 3') },
        { key: '/danh-sach-lop/lop-4', label: renderLinkStyle('/danh-sach-lop/lop-4', 'Lớp 4') },
        { key: '/danh-sach-lop/lop-5', label: renderLinkStyle('/danh-sach-lop/lop-5', 'Lớp 5') },
      ],
    },
  ];

  return (
    <Sider width={260} style={{ background: '#AEE2A4', minHeight: '100vh' }} className="overflow-y-auto border-r border-white/20">
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemBg: 'transparent',
              itemSelectedBg: '#FEFBF4',
              itemHoverBg: 'rgba(255,255,255,0.3)',
              itemSelectedColor: '#61B543',
              itemColor: '#000000',
              itemMarginInline: 12,
              itemBorderRadius: 12,
              subMenuItemBg: 'transparent',
              activeBarWidth: 0,
            },
          },
        }}
      >
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          openKeys={openKeys}
          onOpenChange={(keys) => setOpenKeys(keys)}
          style={{ height: '100%', borderRight: 0, background: 'transparent', paddingTop: 20 }}
          items={menuItems}
        />
      </ConfigProvider>
    </Sider>
  );
};

export default AppSiderMenu;