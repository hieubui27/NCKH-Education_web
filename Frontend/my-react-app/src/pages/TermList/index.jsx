import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import bannerImage from '../../assets/Group 1.png';
import bookTap1 from '../../assets/tieng_viet_2_tap_1.png';
import bookTap2 from '../../assets/tieng_viet_2_tap_2.png';

const TermList = () => {
  const navigate = useNavigate();
  const { classId } = useParams();

  // Dữ liệu cứng hiển thị ngay lập tức
  const terms = [
    { id: '1', name: 'Tập 1', image: bookTap1 },
    { id: '2', name: 'Tập 2', image: bookTap2 },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center bg-[#FEFBF4] rounded-2xl">
      {/* Banner */}
      <div className="w-full max-w-5xl mb-12 mt-4 px-4 sm:px-8">
        <img
          src={bannerImage}
          alt="Banner Cùng nhau tập đọc"
          className="w-full h-auto object-contain rounded-2xl"
        />
      </div>

      {/* Books Grid */}
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-16 px-6 pb-16 justify-items-center">
        {terms.map((term) => (
          <div
            key={term.id}
            onClick={() => navigate(`/danh-sach-lop/${classId}/ky/${term.id}`)}
            className="flex justify-center transition-transform hover:-translate-y-2 cursor-pointer drop-shadow-md hover:drop-shadow-xl"
          >
            <img
              src={term.image}
              alt={term.name}
              className="w-full max-w-70 h-auto object-cover rounded shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermList;