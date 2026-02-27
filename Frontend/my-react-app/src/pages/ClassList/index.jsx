import React from 'react';
import { useNavigate } from 'react-router-dom';
import bannerImage from '../../assets/Group 1.png';

const ClassList = () => {
  const navigate = useNavigate();
  const classes = [
    { id: 1, name: 'Lớp 2', path: '/danh-sach-lop/lop-2' },
    { id: 2, name: 'Lớp 3', path: '/danh-sach-lop/lop-3' },
    { id: 3, name: 'Lớp 4', path: '/danh-sach-lop/lop-4' },
    { id: 4, name: 'Lớp 5', path: '/danh-sach-lop/lop-5' },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center bg-[#FEFBF4] rounded-2xl">
      {/* Banner */}
      <div className="w-full max-w-5xl mb-10 mt-4">
        <img
          src={bannerImage}
          alt="Banner Cùng nhau tập đọc"
          className="w-full h-auto object-contain rounded-2xl"
        />
      </div>

      {/* Grid */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {classes.map((cls) => (
          <div
            key={cls.id}
            onClick={() => navigate(cls.path)}
            className="bg-[#AEE2A4] rounded-2xl flex items-center justify-center p-14 cursor-pointer hover:bg-[#9cd392] transition-colors shadow-sm"
          >
            <span className="text-5xl font-bold text-black tracking-wide cursor-pointer">
              {cls.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassList;
