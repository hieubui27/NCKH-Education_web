import React, { useState, useEffect } from 'react';
import { UserOutlined, BookOutlined, TranslationOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const menuConfig = [
  { key: '/ca-nhan', icon: <UserOutlined />, label: 'Trang cá nhân' },
  {
    key: '/danh-sach-lop',
    icon: <BookOutlined />,
    label: 'Mục lục',
    children: [
      {
        key: '/danh-sach-lop/lop-1',
        label: 'Lớp 1',
        children: [
          {
            key: '/danh-sach-lop/lop-1/ky/1',
            label: 'Học kỳ 1',
            children: [
              {
                key: '/danh-sach-lop/lop-1/ky/1/chu-de/toan',
                label: 'Chủ đề Toán',
                children: [
                  { key: '/danh-sach-lop/lop-1/ky/1/chu-de/toan/bai-hoc/so-hoc', label: 'Bài 1: Số học' },
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  { key: '/giai-nghia', icon: <TranslationOutlined />, label: 'Giải nghĩa từ' },
];

const getMenuItems = (data) => {
  return data.map((item) => ({
    key: item.key,
    icon: item.icon,
    label: <Link to={item.key} style={{ color: 'inherit', textDecoration: 'none' }}>{item.label}</Link>,
    children: item.children ? getMenuItems(item.children) : null,
  }));
};

const AppSiderMenu = () => {
  const location = useLocation();
  const { token } = theme.useToken();
  const [openKeys, setOpenKeys] = useState([]);

  // Tự động mở menu cha dựa trên URL
  useEffect(() => {
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const keys = pathSnippets.map((_, index) => 
      '/' + pathSnippets.slice(0, index + 1).join('/')
    );
    setOpenKeys(keys);
  }, [location.pathname]);

  return (
    <Sider width={280} style={{ background: token.colorBgContainer }}>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        openKeys={openKeys}
        onOpenChange={(keys) => setOpenKeys(keys)}
        style={{ height: '100%', borderInlineEnd: 0 }}
        items={getMenuItems(menuConfig)}
      />
    </Sider>
  );
};

export default AppSiderMenu;