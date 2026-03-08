import React, { useState, useEffect } from 'react';
import { Layout, Menu, ConfigProvider, Spin } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import { 
  UserOutlined, 
  ReadOutlined, 
  SmileOutlined 
} from '@ant-design/icons';

const { Sider } = Layout;

const AppSiderMenu = () => {
  const location = useLocation();
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openKeys, setOpenKeys] = useState(['/danh-sach-lop', '/danh-sach-lop/lop-2', '/danh-sach-lop/lop-2/ky/2']);

  // 1. Lấy dữ liệu thực tế cho Lớp 2 - Kỳ 2
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

  // Helper để định dạng text cho đồng bộ
  const renderLabel = (text, weight = "font-extrabold") => (
    <span className={`${weight} text-black text-[16px]`}>{text}</span>
  );

  // 2. Cấu trúc Menu: Tĩnh các lớp khác, Động cho Lớp 2 Kỳ 2
  const menuItems = [
    {
      key: '/ca-nhan',
      icon: <UserOutlined />,
      label: <Link to="/ca-nhan">{renderLabel('Trang cá nhân')}</Link>,
    },
    {
      key: '/danh-sach-lop',
      icon: <ReadOutlined />,
      label: renderLabel('Mục lục'),
      children: [
        {
          key: '/danh-sach-lop/lop-2',
          label: renderLabel('Lớp 2'),
          children: [
            { 
              key: '/danh-sach-lop/lop-2/ky/1', 
              label: <span className="text-gray-400 italic font-bold">Học kỳ I</span> 
            },
            {
              key: '/danh-sach-lop/lop-2/ky/2',
              label: renderLabel('Học kỳ II'),
              // Đổ dữ liệu thật từ API vào đây
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
        { key: '/danh-sach-lop/lop-3', label: renderLabel('Lớp 3') },
        { key: '/danh-sach-lop/lop-4', label: renderLabel('Lớp 4') },
        { key: '/danh-sach-lop/lop-5', label: renderLabel('Lớp 5') },
      ],
    },
  ];

  return (
    <Sider width={260} style={{ background: '#AEE2A4' }} className="h-screen overflow-y-auto border-r border-white/20">
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