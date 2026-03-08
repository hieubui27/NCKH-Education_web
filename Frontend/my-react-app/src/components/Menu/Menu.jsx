import React, { useState, useEffect } from 'react';
import { Layout, Menu, ConfigProvider, Spin } from 'react-router-dom';
import { useLocation, Link } from 'react-router-dom';
import { 
  UserOutlined, 
  ReadOutlined, 
  BorderOutlined, 
  FolderOpenOutlined 
} from '@ant-design/icons';

const { Sider } = Layout;

const AppSiderMenu = () => {
  const location = useLocation();
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openKeys, setOpenKeys] = useState(['/danh-sach-lop', '/danh-sach-lop/lop-2']);

  // 1. Chỉ gọi API lấy dữ liệu cho Lớp 2 - Kỳ 2
  useEffect(() => {
    const fetchRealData = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/lessons'); // API lấy danh sách bài học/chủ đề hiện có
        const result = await res.json();
        if (result.success) {
          setThemes(result.data || []);
        }
      } catch (error) {
        console.error("Lỗi tải dữ liệu thực tế:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRealData();
  }, []);

  // 2. Hàm tạo label với Style đồng nhất
  const formatLabel = (text, isMain = false) => (
    <span className={`font-extrabold text-black ${isMain ? 'text-lg' : 'text-base'}`}>
      {text}
    </span>
  );

  // 3. Cấu trúc Menu kết hợp Tĩnh & Động
  const menuItems = [
    {
      key: '/ca-nhan',
      icon: <UserOutlined />,
      label: <Link to="/ca-nhan">{formatLabel('Trang cá nhân', true)}</Link>,
    },
    {
      key: '/danh-sach-lop',
      icon: <ReadOutlined />,
      label: formatLabel('Mục lục', true),
      className: 'border-b border-white/40',
      children: [
        {
          key: '/danh-sach-lop/lop-2',
          label: formatLabel('Lớp 2'),
          children: [
            { 
              key: '/danh-sach-lop/lop-2/ky/1', 
              label: <span className="font-bold text-gray-400 italic">Học kỳ I (Sắp ra mắt)</span> 
            },
            {
              key: '/danh-sach-lop/lop-2/ky/2',
              label: formatLabel('Học kỳ II'),
              // ĐỔ DATA THẬT VÀO ĐÂY
              children: loading ? [{ key: 'loading', label: <Spin size="small" /> }] : themes.map(t => ({
                key: `/danh-sach-lop/lop-2/ky/2/chu-de/${t.id}`,
                label: (
                  <Link to={`/danh-sach-lop/lop-2/ky/2/chu-de/${t.id}`}>
                    <span className="text-sm font-semibold text-gray-600 hover:text-[#61B543]">
                      {t.title}
                    </span>
                  </Link>
                )
              }))
            },
          ]
        },
        { key: '/danh-sach-lop/lop-3', label: formatLabel('Lớp 3') },
        { key: '/danh-sach-lop/lop-4', label: formatLabel('Lớp 4') },
        { key: '/danh-sach-lop/lop-5', label: formatLabel('Lớp 5') },
      ]
    }
  ];

  return (
    <Sider width={260} style={{ background: '#AEE2A4' }} className="h-screen overflow-y-auto shadow-lg">
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemBg: 'transparent',
              itemSelectedBg: '#FEFBF4',
              itemHoverBg: 'rgba(255,255,255,0.3)',
              itemSelectedColor: '#61B543',
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