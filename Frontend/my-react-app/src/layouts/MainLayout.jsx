import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import AppFooter from '../components/Footer/AppFooter';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-brand-ivory font-sans flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center w-full bg-[#FFFDEF]">
        <Outlet />
      </main>
      <AppFooter /> {/* Thêm vào đây */}
    </div>
  );
};

export default MainLayout;