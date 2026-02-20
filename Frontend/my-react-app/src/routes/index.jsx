import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/home';
import Login from '../pages/login';
import AppLayout from '../layouts/AppLayout';
import MainLayout from '../layouts/MainLayout';

// Mock Components (Bạn sẽ thay bằng file Page thật sau)
const Placeholder = ({ name }) => <div className="text-2xl font-bold text-brand-green">{name}</div>;

const AppRoutes = () => {
  return (
    <Routes>
      {/* Cụm trang Public */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Cụm trang App Học Tập */}
      <Route element={<AppLayout />}>
        <Route path="/ca-nhan" element={<Placeholder name="Thông tin cá nhân (Frame 8)" />} />
        <Route path="/danh-sach-lop" element={<Placeholder name="Chọn Lớp (Frame 17)" />} />
        
        {/* Dynamic Routes cho luồng học */}
        <Route path="/lop/:classId" element={<Placeholder name="Danh sách Học kỳ (Frame 18)" />} />
        <Route path="/lop/:classId/ky/:termId" element={<Placeholder name="Danh sách Bài học (Frame 19/20)" />} />
        <Route path="/bai-hoc/:lessonId" element={<Placeholder name="Nội dung bài đọc (Frame 21/22)" />} />
        <Route path="/giai-nghia" element={<Placeholder name="Giải nghĩa từ (Frame 23)" />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;