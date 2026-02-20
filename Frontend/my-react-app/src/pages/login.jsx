import { Form, Input, Button } from 'antd';

const Login = () => {
  return (
    <div className="w-full max-w-md bg-brand-green-light p-8 rounded-2xl shadow-lg border-2 border-brand-green">
      <h2 className="text-center text-2xl font-bold text-brand-black mb-6">
        VÀO HỌC THÔI!
      </h2>
      
      <Form layout="vertical" onFinish={(vals) => console.log(vals)}>
        <Form.Item label={<span className="font-bold">Tên đăng nhập:</span>} name="username">
          <Input className="rounded-lg h-10" placeholder="Nhập tên của bạn..." />
        </Form.Item>

        <Form.Item label={<span className="font-bold">Mật khẩu:</span>} name="password">
          <Input.Password className="rounded-lg h-10" placeholder="********" />
        </Form.Item>

        <Form.Item className="mt-8">
          <Button 
            type="primary" 
            htmlType="submit" 
            className="w-full h-12 bg-brand-green font-bold text-lg hover:scale-105 transition-transform"
          >
            ĐĂNG NHẬP NGAY
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;