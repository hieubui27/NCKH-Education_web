import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react'; // Sử dụng icon đồng bộ
import logoTruong from '/Logo_Trường_Đại_học_Sư_phạm_Hà_Nội.png';
import logoKhoa from '/Logo_Khoa.png';

const AppFooter = () => {
  return (
    <footer className="w-full bg-[#61B543] text-white py-12 mt-auto border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start border-b border-white/20 pb-10">

          {/* Cột 1: Cụm Logo (Trái) */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="bg-white p-1 rounded-full shadow-md">
                <img 
                  src={logoTruong} 
                  alt="Trường ĐHSP Hà Nội" 
                  className="h-16 md:h-20 w-16 md:w-20 object-contain rounded-full" 
                />
              </div>
              <div className="h-12 w-[1.5px] bg-white/40 hidden md:block"></div>
              <div className="bg-white p-1 rounded-full shadow-md">
                <img 
                  src={logoKhoa} 
                  alt="Khoa GDĐB Logo" 
                  className="h-16 md:h-20 w-16 md:w-20 object-contain rounded-full" 
                />
              </div>
            </div>
            <p className="text-xs md:text-sm font-bold opacity-90 text-center md:text-left leading-relaxed">
              DỰ ÁN NGHIÊN CỨU KHOA HỌC SINH VIÊN
            </p>
          </div>

          {/* Cột 2: Thông tin dự án (Giữa) */}
          <div className="text-center flex flex-col items-center px-2">
            <h4 className="text-lg md:text-xl font-black mb-5 uppercase tracking-widest border-b-2 border-white/30 pb-1 inline-block">
              VienKey Project
            </h4>
            <div className="text-[14px] md:text-[15px] font-medium leading-relaxed opacity-95 space-y-2">
              <p>Sản phẩm nghiên cứu thuộc</p>
              <p className="font-black text-[16px] md:text-[17px]">KHOA GIÁO DỤC ĐẶC BIỆT</p>
              <p>Trường Đại học Sư phạm Hà Nội</p>
            </div>
          </div>

          {/* Cột 3: Liên hệ (Phải) */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-lg md:text-xl font-black mb-5 uppercase tracking-widest border-b-2 border-white/30 pb-1 inline-block">
              Liên hệ
            </h4>
            <ul className="text-[14px] md:text-[15px] font-medium space-y-4">
              <li className="flex items-center justify-center md:justify-end gap-3 opacity-90 hover:opacity-100 transition-opacity">
                <span className="text-sm">136 Xuân Thủy, Cầu Giấy, Hà Nội</span>
                <MapPin size={18} className="shrink-0" />
              </li>
              <li className="flex items-center justify-center md:justify-end gap-3 opacity-90 hover:opacity-100 transition-opacity">
                <span className="text-sm">vienkey.edu@gmail.com</span>
                <Mail size={18} className="shrink-0" />
              </li>
              <li className="flex items-center justify-center md:justify-end gap-3 opacity-90 hover:opacity-100 transition-opacity">
                <span className="text-sm">(+84) 123 456 789</span>
                <Phone size={18} className="shrink-0" />
              </li>
            </ul>
          </div>
        </div>

        {/* Bản quyền */}
        <div className="pt-8 text-center text-[11px] md:text-xs font-bold opacity-60 uppercase tracking-tighter">
          © {new Date().getFullYear()} VIENKEY - HỖ TRỢ DẠY HỌC TẬP ĐỌC CHO TRẺ TỰ KỶ. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;