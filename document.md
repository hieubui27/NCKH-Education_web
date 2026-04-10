### **Bước 5. Lập trình (Development)**

Quá trình lập trình được thực hiện dựa trên kiến trúc **Client-Server**, tách biệt rõ rệt giữa giao diện người dùng (Frontend) và xử lý logic hệ thống (Backend). Dưới đây là các thông tin chi tiết về môi trường và công nghệ đã sử dụng:

#### **5.1. Môi trường phát triển (Development Environment)**
- **Công cụ lập trình:** Visual Studio Code (VS Code) với các extension hỗ trợ (ESLint, Prettier, Tailwind CSS IntelliSense).
- **Môi trường thực thi:** Node.js (phiên bản 18.x trở lên).
- **Quản lý phiên bản:** Sử dụng Git và GitHub để lưu trữ và quản lý mã nguồn.
- **Kiểm thử API:** Sử dụng Postman để kiểm tra các luồng dữ liệu của bộ API nội bộ.

#### **5.2. Công nghệ sử dụng (Technology Stack)**

| Thành phần | Công nghệ sử dụng | Vai trò |
| :--- | :--- | :--- |
| **Frontend** | **ReactJS 19 (Vite)** | Framework chính để xây dựng giao diện người dùng nhanh và tối ưu. |
| **Styling** | **Tailwind CSS 4 & Ant Design** | Thiết kế giao diện hiện đại, responsive và sử dụng các component UI chuẩn hóa. |
| **State Management** | **Redux Toolkit & Context API** | Quản lý trạng thái ứng dụng (thông tin người dùng, giỏ hàng, tiến trình học). |
| **Backend** | **Node.js & Express.js** | Xây dựng hệ thống RESTful API để xử lý logic và kết nối dữ liệu. |
| **Database** | **PostgreSQL (Supabase)** | Cơ sở dữ liệu quan hệ mạnh mẽ, lưu trữ thông tin bài học, từ vựng và người dùng. |
| **Bảo mật** | **JWT & Bcryptjs** | Mã hóa mật khẩu người dùng và xác thực quyền truy cập thông qua Token. |

#### **5.3. Quá trình thực hiện mã hóa (Implementation)**

**a. Xây dựng Cơ sở dữ liệu (Database Design):**
- Thiết kế các bảng dữ liệu có mối quan hệ chặt chẽ: `themes` (chủ đề), `weeks` (tuần học), `lessons` (bài học) và `vocabularies` (từ vựng).
- Sử dụng SQL để tối ưu hóa việc truy vấn dữ liệu phân cấp (ví dụ: lấy toàn bộ bài học thuộc một chủ đề cụ thể bằng `JOIN` và `json_agg`).

**b. Phát triển Backend (API Logic):**
- Xây dựng các Route xử lý: Đăng ký/Đăng nhập, tìm kiếm trực tiếp (Live Search), lấy nội dung bài học chi tiết.
- Sử dụng kiến trúc **Model-Controller** để tách biệt phần truy vấn dữ liệu và phần xử lý logic nghiệp vụ.
- Tích hợp **Middleware** để kiểm soát quyền truy cập, đảm bảo chỉ người dùng đã đăng nhập mới có thể lưu tiến độ học tập.

**c. Phát triển Frontend (UI/UX Implementation):**
- Hiện thực hóa các bản thiết kế từ Figma sang mã nguồn sử dụng Tailwind CSS.
- **Tính năng cốt lõi:**
    - **Cây lộ trình học tập:** Hiển thị danh sách khóa học theo dạng phân cấp (Lớp -> Học kỳ -> Chủ đề -> Bài học).
    - **Tra cứu thông minh:** Chức năng tìm kiếm cho phép người dùng tìm nhanh theo từ khóa, trả về kết quả bao gồm cả bài học và từ vựng liên quan.
    - **Trang học từ vựng:** Hiển thị chi tiết từ vựng kèm theo định nghĩa, ví dụ, âm thanh và hình ảnh minh họa sinh động.

#### **5.4. Kiểm thử và Tối ưu hóa**
- Thực hiện **Unit Test** cho các hàm xử lý dữ liệu quan trọng ở Backend.
- Tối ưu hóa hiệu suất tải trang bằng cách sử dụng công cụ **Vite** để đóng gói (bundle) mã nguồn và nén hình ảnh trước khi hiển thị.
- Đảm bảo tính **Responsive** trên nhiều loại thiết bị (Desktop, Tablet, Mobile).
