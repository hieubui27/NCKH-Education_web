// src/App.jsx
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import AppRoutes from './routes'; // Import file route chúng ta vừa viết

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#61B543',
          fontFamily: 'Arial',
          colorBgContainer: '#FFFDEF',
        },
      }}
    >
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;