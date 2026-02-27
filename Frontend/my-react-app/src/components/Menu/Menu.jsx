import React, { useState, useEffect } from 'react';
import { Layout, Menu, ConfigProvider } from 'antd';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const { Sider } = Layout;

const menuConfig = [
  { key: '/ca-nhan', label: <span className="text-xl font-extrabold text-black">Trang cá nhân</span> },
  {
    key: '/danh-sach-lop',
    label: <span className="text-xl font-extrabold text-black">Mục lục</span>,
    className: 'border-b border-white/40',
    children: [
      {
        key: '/danh-sach-lop/lop-2',
        label: <span className="text-xl font-extrabold text-black">Lớp 2</span>,
        className: 'border-b border-white/40',
        children: [
          {
            key: '/danh-sach-lop/lop-2/ky/1',
            label: <span className="text-lg font-bold text-black border-b border-white/40 block pb-1">Học kỳ I</span>,
            children: [
              { key: '/danh-sach-lop/lop-2/ky/1/chu-de/1', label: <span className="text-base font-semibold text-gray-500">Em lớn lên từng ngày</span> },
              { key: '/danh-sach-lop/lop-2/ky/1/chu-de/2', label: <span className="text-base font-semibold text-gray-500">Đi học vui sao</span> },
              { key: '/danh-sach-lop/lop-2/ky/1/chu-de/3', label: <span className="text-base font-semibold text-gray-500">Niềm vui tuổi thơ</span> },
              { key: '/danh-sach-lop/lop-2/ky/1/chu-de/4', label: <span className="text-base font-semibold text-gray-500">Mái ấm gia đình</span> },
            ]
          },
          { key: '/danh-sach-lop/lop-2/ky/2', label: <span className="text-lg font-bold text-black border-b border-white/40 block pb-1">Học kỳ II</span> },
        ]
      },
      {
        key: '/danh-sach-lop/lop-3',
        label: <span className="text-xl font-extrabold text-black border-b border-white/40 block pb-1">Lớp 3</span>,
      },
      {
        key: '/danh-sach-lop/lop-4',
        label: <span className="text-xl font-extrabold text-black border-b border-white/40 block pb-1">Lớp 4</span>,
      },
      {
        key: '/danh-sach-lop/lop-5',
        label: <span className="text-xl font-extrabold text-black">Lớp 5</span>,
      },
    ]
  },
];

const getMenuItems = (data) => {
  return data.map((item) => ({
    key: item.key,
    icon: item.icon,
    className: item.className,
    label: (
      <Link to={item.key} style={{ display: 'block', width: '100%', color: 'inherit', textDecoration: 'none' }}>
        {item.label}
      </Link>
    ),
    children: item.children ? getMenuItems(item.children) : null,
  }));
};

const AppSiderMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState([]);

  useEffect(() => {
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const keys = pathSnippets.map((_, index) =>
      '/' + pathSnippets.slice(0, index + 1).join('/')
    );
    setOpenKeys(keys);
  }, [location.pathname]);

  return (
    <Sider width={250} style={{ background: '#AEE2A4' }}>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemBg: 'transparent',
              itemSelectedBg: '#FEFBF4',
              itemHoverBg: 'rgba(255,255,255,0.3)',
              itemActiveBg: '#FEFBF4',
              itemColor: '#000000',
              itemSelectedColor: '#000000',
              itemMarginInline: 16,
              itemBorderRadius: 16,
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
          style={{ height: '100%', borderInlineEnd: 0, background: 'transparent', paddingTop: 20 }}
          items={getMenuItems(menuConfig)}
          className="cursor-pointer"
        />
      </ConfigProvider>
    </Sider>
  );
};

export default AppSiderMenu;