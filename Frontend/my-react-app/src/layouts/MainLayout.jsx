import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import AppFooter from '../components/Footer/AppFooter';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-brand-ivory font-sans flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 flex flex-col items-center w-full bg-[#FFFDEF]">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4 md:py-8">
          <Outlet />
        </div>
      </main>

      <AppFooter />
    </div>
  );
};

export default MainLayout;