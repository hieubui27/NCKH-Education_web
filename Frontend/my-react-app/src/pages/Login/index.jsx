import { Form, Input, message } from 'antd';
import Banner from '../../components/Banner/Banner';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (vals) => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
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

        <div className="w-full max-w-5xl bg-[#A7DE93] p-8 md:p-14 rounded-[2rem] shadow-sm mt-4">
          <Form
            layout="vertical"
            onFinish={handleLogin}
            className="w-full max-w-4xl mx-auto"
          >
            <Form.Item
              label={<span className="text-xl md:text-2xl font-extrabold text-black font-serif tracking-wide">Tên đăng nhập :</span>}
              name="username"
            >
              <Input
                className="rounded-2xl h-14 md:h-16 text-lg md:text-xl border-none shadow-inner bg-[#FFFDEF]"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-xl md:text-2xl font-extrabold text-black font-serif tracking-wide mt-4">Mật khẩu :</span>}
              name="password"
            >
              <Input.Password
                className="rounded-2xl h-14 md:h-16 text-lg md:text-xl border-none shadow-inner bg-[#FFFDEF]"
              />
            </Form.Item>

            <Form.Item className="mt-12 flex justify-center mb-0">
              <button
                type="submit"
                disabled={loading} // <-- NGĂN BẤM LIÊN TỤC
                className={`bg-[#EB7470] hover:bg-[#d85e5a] text-white text-2xl md:text-3xl font-extrabold px-12 py-4 md:py-5 rounded-full shadow-[0_8px_0_#b53b37] hover:shadow-[0_4px_0_#b53b37] hover:translate-y-1 transition-all cursor-pointer border-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Đăng nhập ngay
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;