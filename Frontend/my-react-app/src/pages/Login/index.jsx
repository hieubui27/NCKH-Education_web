import { Form, Input, message } from 'antd';
import Banner from '../../components/Banner/Banner';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (vals) => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Yêu cầu gửi/nhận cookie
        body: JSON.stringify(vals),
      });
      let data;
      try {
        data = await response.json();
      } catch (err) {
        const textError = await response.text();
        console.error("Lỗi từ server:", textError);
        throw new Error(`Server trả về lỗi: ${response.status}`);
      }

      if (response.ok) {
        message.success('Đăng nhập thành công!');
        login(data.user || data); // Cập nhật state ở Context
        navigate('/ca-nhan');
      } else {
        message.error(data.message || 'Tên đăng nhập hoặc mật khẩu không đúng!');
      }
    } catch (error) {
      console.error(error);
      message.error('Lỗi kết nối đến server!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#FFFDEF] flex flex-col items-center pt-2 pb-20 relative font-sans">
      <div className="w-full max-w-6xl px-4 sm:px-8 z-10 flex flex-col items-center">
        <Banner />

        {/* Nền xanh lá cây dịu nhẹ */}
        <div className="w-full max-w-5xl bg-[#A7DE93] p-8 md:p-14 rounded-[2rem] shadow-sm mt-4">
          <Form
            layout="vertical"
            onFinish={handleLogin}
            className="w-full max-w-4xl mx-auto"
          >
            {/* Input Tên đăng nhập */}
            <Form.Item
              label={<span className="text-xl md:text-2xl font-extrabold text-black font-serif tracking-wide">Tên đăng nhập :</span>}
              name="username"
              rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
            >
              <Input
                placeholder="Nhập tên đăng nhập"
                className="rounded-2xl h-14 md:h-16 text-lg md:text-xl border-none shadow-inner bg-[#FFFDEF]"
              />
            </Form.Item>

            {/* Input Mật khẩu */}
            <Form.Item
              label={<span className="text-xl md:text-2xl font-extrabold text-black font-serif tracking-wide mt-4">Mật khẩu :</span>}
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password
                placeholder="Nhập mật khẩu"
                className="rounded-2xl h-14 md:h-16 text-lg md:text-xl border-none shadow-inner bg-[#FFFDEF]"
              />
            </Form.Item>

            {/* Nút Đăng nhập */}
            <Form.Item className="mt-10 flex justify-center mb-0">
              <button
                type="submit"
                disabled={loading}
                className={`bg-[#EB7470] hover:bg-[#d85e5a] text-white text-2xl md:text-3xl font-extrabold px-12 py-4 md:py-5 rounded-full shadow-[0_8px_0_#b53b37] hover:shadow-[0_4px_0_#b53b37] hover:translate-y-1 transition-all cursor-pointer border-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Đang xử lý...' : 'Đăng nhập ngay'}
              </button>
            </Form.Item>

            {/* Thêm link Đăng ký nếu chưa có tài khoản */}
            <div className="text-center mt-6 text-lg text-black">
              Chưa có tài khoản?{' '}
              <Link to="/register" className="font-extrabold text-[#3b662b] hover:text-[#2a4d1f] underline">
                Đăng ký ngay
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;