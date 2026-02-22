// src/App.jsx
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import AppRoutes from './routes';

function App() {
  return (
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#A7DE93',
        colorError: '#EB7470', 
        borderRadius: 8,
        fontFamily: 'Arial, sans-serif',
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