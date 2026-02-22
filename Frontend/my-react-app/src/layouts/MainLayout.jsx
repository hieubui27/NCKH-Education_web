import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-brand-ivory font-sans flex flex-col">
      <Header />
      {/* Nội dung thay đổi tùy theo trang (Home hoặc Login) */}
      <main className="flex-1 flex flex-col items-center p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;