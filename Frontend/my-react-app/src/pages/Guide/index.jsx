import React from 'react';
import { Link } from 'react-router-dom';
import {
  CompassOutlined,
  UserOutlined,
  GlobalOutlined,
  BranchesOutlined,
  SearchOutlined,
} from '@ant-design/icons';

const sectionIcon = (Icon) => (
  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#61B543]/15 text-[#61B543]">
    <Icon style={{ fontSize: 20 }} />
  </span>
);

const GuidePage = () => {
  return (
    <div className="min-h-screen p-3 md:p-8 font-sans bg-[#FFFDEF] w-full flex justify-center">
      <div className="w-full max-w-4xl bg-white border border-green-100 shadow-sm rounded-2xl overflow-hidden">
        <div className="p-5 md:p-12">
          <header className="mb-10 md:mb-12 pb-8 border-b border-gray-100">
            <p className="text-sm font-semibold text-[#61B543] uppercase tracking-wide mb-2">
              Tài liệu dành cho giáo viên
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
              Hướng dẫn sử dụng hệ thống VienKey
            </h1>
            <p className="mt-3 text-gray-600 text-sm md:text-base leading-relaxed">
              Tổng hợp các bước làm quen với giao diện, tài khoản, nội dung giảng dạy và công cụ tra cứu trên
              website.
            </p>
          </header>

          {/* 1. Bắt đầu nhanh */}
          <section className="mb-10 md:mb-12 scroll-mt-24" id="bat-dau-nhanh">
            <div className="flex items-start gap-4 mb-6">
              {sectionIcon(CompassOutlined)}
              <h2 className="text-xl md:text-2xl text-blue-500 font-semibold border-l-4 border-blue-500 pl-3 flex-1">
                1. Bắt đầu nhanh
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed pl-0 md:pl-14">
              <p>
                Ngay khi truy cập vào website, giáo viên sẽ được đưa đến{' '}
                <Link to="/" className="text-[#61B543] font-semibold hover:underline">
                  Trang chủ
                </Link>{' '}
                – nơi cung cấp cái nhìn tổng quan về toàn bộ hệ thống. Tại đây, thầy/cô có thể nhanh chóng tiếp cận
                các nội dung nổi bật cũng như các thông tin quan trọng.
              </p>
              <div>
                <p className="font-semibold text-gray-800 mb-2">Thanh điều hướng</p>
                <p className="mb-3">
                  Thanh điều hướng được thiết kế cố định tại cạnh trên của màn hình, đóng vai trò là &quot;la bàn&quot;
                  giúp quý thầy/cô di chuyển tức thời giữa các phân khu chức năng mà không làm gián đoạn trải nghiệm:
                </p>
                <ul className="list-disc pl-5 space-y-2 marker:text-[#61B543]">
                  <li>
                    <span className="font-medium text-gray-800">Tin tức:</span>{' '}
                    <Link to="/tin-tuc" className="text-[#61B543] hover:underline">
                      Cập nhật thông báo, sự kiện giáo dục
                    </Link>
                  </li>
                  <li>
                    <span className="font-medium text-gray-800">Chương trình học:</span>{' '}
                    <Link to="/chuong-trinh-hoc" className="text-[#61B543] hover:underline">
                      Danh sách và cấu trúc các khóa học
                    </Link>
                  </li>
                  <li>
                    <span className="font-medium text-gray-800">Tra cứu / Giải nghĩa:</span>{' '}
                    <Link to="/giai-nghia" className="text-[#61B543] hover:underline">
                      Công cụ hỗ trợ tìm kiếm kiến thức
                    </Link>{' '}
                    (sau khi đăng nhập)
                  </li>
                  <li>
                    <span className="font-medium text-gray-800">Học ngay / Danh sách lớp:</span>{' '}
                    <Link to="/danh-sach-lop" className="text-[#61B543] hover:underline">
                      Truy cập trực tiếp vào nội dung giảng dạy
                    </Link>
                  </li>
                  <li>
                    <span className="font-medium text-gray-800">Đăng nhập / Tài khoản cá nhân:</span>{' '}
                    <Link to="/login" className="text-[#61B543] hover:underline">
                      Đăng nhập
                    </Link>
                    {' · '}
                    <Link to="/ca-nhan" className="text-[#61B543] hover:underline">
                      Quản lý thông tin cá nhân
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. Quản lý tài khoản */}
          <section className="mb-10 md:mb-12 scroll-mt-24" id="quan-ly-tai-khoan">
            <div className="flex items-start gap-4 mb-6">
              {sectionIcon(UserOutlined)}
              <h2 className="text-xl md:text-2xl text-blue-500 font-semibold border-l-4 border-blue-500 pl-3 flex-1">
                2. Quản lý tài khoản
              </h2>
            </div>
            <div className="space-y-6 text-gray-700 text-sm md:text-base leading-relaxed pl-0 md:pl-14">
              <p>
                Việc sử dụng tài khoản cá nhân giúp giáo viên khai thác tối đa các chức năng của hệ thống, đồng thời
                lưu trữ và theo dõi tiến trình giảng dạy một cách hiệu quả.
              </p>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Đăng ký / Đăng nhập</h3>
                <p className="mb-2">
                  <span className="font-medium">Đăng nhập:</span> Nhấn vào nút &quot;Đăng nhập&quot; ở góc trên bên
                  phải, sau đó nhập Email và Mật khẩu.{' '}
                  <Link to="/login" className="text-[#61B543] font-semibold hover:underline">
                    Mở trang đăng nhập
                  </Link>
                </p>
                <p className="mb-2">
                  <span className="font-medium">Đăng ký:</span> Tại trang đăng nhập, chọn chuyển sang &quot;Đăng
                  ký&quot; và điền các thông tin: Họ và tên, Email, Mật khẩu.{' '}
                  <Link to="/register" className="text-[#61B543] font-semibold hover:underline">
                    Đăng ký tài khoản
                  </Link>
                </p>
                <p>
                  Sau khi đăng nhập thành công, giáo viên có thể sử dụng đầy đủ các tính năng và lưu lại tiến độ làm
                  việc.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Trang cá nhân</h3>
                <ul className="list-disc pl-5 space-y-2 marker:text-[#61B543]">
                  <li>
                    <span className="font-medium">Xem thông tin:</span> Quản lý hồ sơ cá nhân gồm ảnh đại diện, tên
                    hiển thị, ngày sinh,...
                  </li>
                  <li>
                    <span className="font-medium">Cập nhật thông tin:</span> Dễ dàng chỉnh sửa và cập nhật bất kỳ lúc
                    nào.
                  </li>
                  <li>
                    <span className="font-medium">Đăng xuất:</span> Khuyến nghị sử dụng sau mỗi phiên làm việc, đặc biệt
                    khi dùng thiết bị chung để đảm bảo an toàn dữ liệu.
                  </li>
                </ul>
                <p className="mt-3">
                  <Link to="/ca-nhan" className="text-[#61B543] font-semibold hover:underline">
                    Đi tới Trang cá nhân
                  </Link>
                </p>
              </div>
            </div>
          </section>

          {/* 3. Tra cứu thông tin chung */}
          <section className="mb-10 md:mb-12 scroll-mt-24" id="tra-cuu-thong-tin">
            <div className="flex items-start gap-4 mb-6">
              {sectionIcon(GlobalOutlined)}
              <h2 className="text-xl md:text-2xl text-blue-500 font-semibold border-l-4 border-blue-500 pl-3 flex-1">
                3. Tra cứu thông tin chung
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed pl-0 md:pl-14">
              <p>
                Website không chỉ cung cấp nội dung giảng dạy mà còn là một hệ sinh thái thông tin hỗ trợ giáo viên
                nâng cao chuyên môn.
              </p>
              <ul className="list-disc pl-5 space-y-3 marker:text-[#61B543]">
                <li>
                  <span className="font-medium text-gray-800">Tin tức:</span>{' '}
                  <Link to="/tin-tuc" className="text-[#61B543] hover:underline">
                    Cập nhật các thông báo mới nhất
                  </Link>
                  , sự kiện giáo dục và tài liệu hữu ích.
                </li>
                <li>
                  <span className="font-medium text-gray-800">Chương trình học:</span>{' '}
                  <Link to="/chuong-trinh-hoc" className="text-[#61B543] hover:underline">
                    Cái nhìn tổng thể về các khóa học
                  </Link>
                  , giúp giáo viên định hướng lộ trình giảng dạy rõ ràng.
                </li>
                <li>
                  <span className="font-medium text-gray-800">Giá trị bổ trợ:</span> Hệ thống tích hợp nhiều tài liệu
                  tham khảo giúp mở rộng kiến thức và nâng cao hiệu quả giảng dạy.
                </li>
              </ul>
            </div>
          </section>

          {/* 4. Lộ trình học tập */}
          <section className="mb-10 md:mb-12 scroll-mt-24" id="lo-trinh-hoc-tap">
            <div className="flex items-start gap-4 mb-6">
              {sectionIcon(BranchesOutlined)}
              <h2 className="text-xl md:text-2xl text-blue-500 font-semibold border-l-4 border-blue-500 pl-3 flex-1">
                4. Lộ trình học tập (Khai thác bài học)
              </h2>
            </div>
            <div className="space-y-6 text-gray-700 text-sm md:text-base leading-relaxed pl-0 md:pl-14">
              <p>
                Đây là chức năng trọng tâm, cho phép giáo viên tiếp cận nội dung giảng dạy theo cấu trúc khoa học dạng
                cây (Tree).
              </p>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Các bước truy cập bài học</h3>
                <ol className="list-decimal pl-5 space-y-4 marker:font-semibold marker:text-[#61B543]">
                  <li>
                    <span className="font-medium text-gray-800">Bước 1 — Chọn lớp học:</span> Truy cập &quot;Học
                    ngay&quot; hoặc &quot;Danh sách lớp&quot; → chọn khối lớp phù hợp (Lớp 2, 3, 4, 5,...).{' '}
                    <Link to="/danh-sach-lop" className="text-[#61B543] hover:underline">
                      Mở danh sách lớp
                    </Link>
                  </li>
                  <li>
                    <span className="font-medium text-gray-800">Bước 2 — Chọn học kỳ:</span> Chọn Học kỳ 1 hoặc Học kỳ
                    2.
                  </li>
                  <li>
                    <span className="font-medium text-gray-800">Bước 3 — Chọn chủ đề:</span> Mỗi học kỳ được chia
                    thành nhiều chủ đề (Topic), giúp tổ chức kiến thức logic và dễ theo dõi.
                  </li>
                  <li>
                    <span className="font-medium text-gray-800">Bước 4 — Chọn bài học:</span> Danh sách bài học cụ thể
                    sẽ hiển thị trong từng chủ đề.
                  </li>
                  <li>
                    <span className="font-medium text-gray-800">Bước 5 — Khai thác nội dung bài học</span>
                    <ul className="list-disc pl-5 mt-2 space-y-2 marker:text-[#61B543] text-[0.95em]">
                      <li>
                        <span className="font-medium">Nội dung lý thuyết:</span> Trình bày rõ ràng, bám sát trọng tâm
                        bài giảng.
                      </li>
                      <li>
                        <span className="font-medium">Từ khóa nổi bật (Keyword Highlight):</span> Các khái niệm then
                        chốt được làm nổi bật với màu sắc hoặc định dạng riêng, giúp thầy/cô nhấn mạnh kiến thức cho học
                        sinh.
                      </li>
                      <li>
                        <span className="font-medium">Liên kết từ vựng:</span> Khi nhấp vào từ khóa, một cửa sổ phụ
                        (Pop-up) hiển thị định nghĩa khoa học, âm thanh phát âm chuẩn và các ví dụ ngữ cảnh thực tế.
                      </li>
                    </ul>
                  </li>
                </ol>
              </div>
            </div>
          </section>

          {/* 5. Tra cứu & giải nghĩa */}
          <section className="scroll-mt-24" id="tu-dien">
            <div className="flex items-start gap-4 mb-6">
              {sectionIcon(SearchOutlined)}
              <h2 className="text-xl md:text-2xl text-blue-500 font-semibold border-l-4 border-blue-500 pl-3 flex-1">
                5. Tra cứu &amp; giải nghĩa (Từ điển)
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed pl-0 md:pl-14">
              <p>
                Hệ thống tích hợp công cụ tìm kiếm mạnh mẽ, hỗ trợ giáo viên tra cứu nhanh chóng trong quá trình giảng
                dạy.
              </p>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Cách sử dụng</h3>
                <ul className="list-disc pl-5 space-y-2 marker:text-[#61B543]">
                  <li>Nhập từ khóa, thuật ngữ hoặc tên bài học vào thanh tìm kiếm (trên khu vực đã đăng nhập).</li>
                  <li>
                    Hệ thống gợi ý kết quả phù hợp, gồm: chủ đề liên quan, bài học tương ứng, từ vựng phù hợp.
                  </li>
                  <li>Nhấn vào kết quả để được chuyển đến nội dung chi tiết.</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default GuidePage;
