import { Form, Input, Button } from 'antd';
import Banner from '../../components/Banner/Banner';

const Login = () => {
  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#FFFDEF] flex flex-col items-center pt-2 pb-20 relative font-sans">
      <div className="w-full max-w-6xl px-4 sm:px-8 z-10 flex flex-col items-center">
        <Banner />

        <div className="w-full max-w-5xl bg-[#A7DE93] p-8 md:p-14 rounded-[2rem] shadow-sm mt-4">
          <Form
            layout="vertical"
            onFinish={(vals) => console.log(vals)}
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
                className="bg-[#EB7470] hover:bg-[#d85e5a] text-white text-2xl md:text-3xl font-extrabold px-12 py-4 md:py-5 rounded-full shadow-[0_8px_0_#b53b37] hover:shadow-[0_4px_0_#b53b37] hover:translate-y-1 transition-all cursor-pointer border-none"
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