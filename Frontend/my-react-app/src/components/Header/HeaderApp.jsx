import { Input, Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const HeaderApp = () => {
  return (
    <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          background: '#61B543',
          paddingInline: 24
        }}
      >
        <Link
          to="/"
          className="text-white text-2xl font-extrabold tracking-tight"
          style={{ minWidth: 80, textDecoration: 'none' }}
        >
          Lgo
        </Link>
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Input.Search
            placeholder="Tìm kiếm bài học, chương, mục lục..."
            allowClear
            className="max-w-xl"
            style={{ width: 350 }}
          />
        </div>
        <div style={{ minWidth: 80 }} />
      </Header>
  );
};

export default HeaderApp;