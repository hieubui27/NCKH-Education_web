import React from 'react';
import logoWeb from '/favicon.png'; // Logo Web của bạn
import logoKhoa from '/header gddb.png'; // Logo Khoa bạn vừa gửi

const AppFooter = () => {
  return (
    // Giữ nguyên màu nền xanh lá #61B543
    <footer className="w-full bg-[#61B543] text-white py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-white/20 pb-8">
          
          {/* Cột 1: Hệ thống Logo */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/10 p-4 rounded-lg w-full justify-center md:justify-start">
              <img src={logoWeb} alt="VienKey Logo" className="h-10 w-auto object-contain" />
              <div className="h-px w-20 sm:h-10 sm:w-px bg-white/30"></div>
              {/* Logo Khoa mới, dùng filter brightness(0) invert(1) để chuyển sang màu trắng cho dễ nhìn trên nền xanh */}
              <img src={logoKhoa} alt="Khoa GDĐB Logo" className="h-10 w-auto object-contain brightness-0 invert" />
            </div>
          </div>

          {/* Cột 2: Thông tin dự thi */}
          <div className="text-center">
            <h4 className="text-lg font-bold mb-3 uppercase tracking-wider">Thông tin dự án</h4>
            <p className="text-sm leading-relaxed opacity-90">
              Sản phẩm dự thi Hội thi Sinh viên nghiên cứu Khoa học <br />
              <span className="font-semibold text-[#FFFDEF]">Khoa Giáo dục đặc biệt</span> <br />
              Trường Đại học Sư phạm Hà Nội.
            </p>
          </div>

          {/* Cột 3: Liên hệ */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-lg font-bold mb-3 uppercase tracking-wider">Liên hệ</h4>
            <ul className="text-sm space-y-2 text-center md:text-right opacity-90">
              <li>📍 136 Xuân Thủy, Cầu Giấy, Hà Nội</li>
              <li>📧 Email: contact@vienkey.edu.vn</li>
              <li>📞 Hotline: (+84) 123 456 789</li>
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