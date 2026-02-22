import { Routes, Route, Navigate } from 'react-router-dom';

import AppLayout from '../layouts/AppLayout';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Account from '../pages/Account';
import ClassList from '../pages/ClassList';
import TermList from '../pages/TermList';
import TopicList from '../pages/TopicList';
import LessonList from '../pages/LessonList';
import LessonDetail from '../pages/LessonDetail';
import Dictionary from '../pages/Dictionary';



const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/ca-nhan" element={<Account />} />
        <Route path="/giai-nghia" element={<Dictionary />} />

        <Route path="/danh-sach-lop">
          <Route index element={<ClassList />} />
          <Route path=":classId">
            <Route index element={<TermList />} />

            <Route path="ky/:termId">
              <Route index element={<TopicList />} />

              <Route path="chu-de/:topicId">
                <Route index element={<LessonList />} />
                <Route path="bai-hoc/:lessonId" element={<LessonDetail />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;