import React from 'react';
import logoTruong from '/Logo_Trường_Đại_học_Sư_phạm_Hà_Nội.png';
import logoKhoa from '/Logo_Khoa.png';
import logoWeb from '/favicon.png';

const AppFooter = () => {
  return (
    // Giữ nguyên màu nền xanh lá #61B543
    <footer className="w-full bg-[#61B543] text-white py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start border-b border-white/20 pb-8">

          {/* Cột 1: Cụm Logo (Trái) */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <div className="flex items-center gap-6">
              <img src={logoTruong} alt="Trường ĐHSP Hà Nội" className="h-[60px] md:h-[80px] w-[60px] md:w-[80px] object-contain rounded-full bg-white shadow-sm" />
              <div className="h-10 w-[2px] bg-white opacity-50"></div>
              <img src={logoKhoa} alt="Khoa GDĐB Logo" className="h-[60px] md:h-[80px] w-[60px] md:w-[80px] object-contain rounded-full shadow-sm" />
            </div>
          </div>

          {/* Cột 2: Thông tin dự án (Giữa) */}
          <div className="text-center flex flex-col items-center">
            <h4 className="text-xl font-extrabold mb-4 uppercase tracking-wider text-white">Thông tin dự án</h4>
            <div className="text-[15px] font-medium leading-loose text-white opacity-90 space-y-1">
              <p>Sản phẩm dự thi Hội thi Sinh viên nghiên cứu Khoa học</p>
              <p className="font-extrabold text-white text-[16px]">Khoa Giáo dục đặc biệt</p>
              <p>Trường Đại học Sư phạm Hà Nội.</p>
            </div>
          </div>

          {/* Cột 3: Liên hệ (Phải) */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-xl font-extrabold mb-4 uppercase tracking-wider text-white">Liên hệ</h4>
            <ul className="text-[15px] font-medium space-y-3 text-center md:text-right text-white opacity-90">
              <li className="flex items-center justify-end gap-2">
                <span>📍</span> 136 Xuân Thủy, Cầu Giấy, Hà Nội
              </li>
              <li className="flex items-center justify-end gap-2">
                <span>📧</span> Email: contact@vienkey.edu.vn
              </li>
              <li className="flex items-center justify-end gap-2">
                <span>📞</span> Hotline: (+84) 123 456 789
              </li>
            </ul>
          </div>
        </div>

        {/* Bản quyền */}
        <div className="pt-6 text-center text-xs opacity-70">
          © {new Date().getFullYear()} VienKey. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;