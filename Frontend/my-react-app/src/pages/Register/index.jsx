import { Form, Input, message, DatePicker, Radio } from 'antd';
import Banner from '../../components/Banner/Banner';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Cấu hình hiển thị lỗi tiếng Việt
    const validateMessages = {
        required: 'Vui lòng nhập ${label}!',
        types: {
            email: '${label} không đúng định dạng!',
        },
    };

    const handleRegister = async (vals) => {
        try {
            setLoading(true);

            // Xử lý lại dữ liệu từ Form cho khớp với yêu cầu của Backend
            const payload = {
                ...vals,
                phonenumber: vals.phone,
                // Xử lý DatePicker của Ant Design sang dạng chuỗi YYYY-MM-DD
                dob: vals.dob ? vals.dob.format('YYYY-MM-DD') : undefined
            };

            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (response.ok) {
                message.success('Đăng ký thành công!');
                navigate('/login');
            } else {
                message.error(data.message);
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
                        onFinish={handleRegister}
                        validateMessages={validateMessages}
                        className="w-full max-w-4xl mx-auto"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1">
                            <Form.Item
                                label={<span className="text-xl font-extrabold text-[#3b662b] font-serif tracking-wide">Họ và tên :</span>}
                                name="fullname"
                                rules={[{ required: true }]}
                            >
                                <Input
                                    placeholder="Ví dụ: Nguyễn Văn A"
                                    className="rounded-2xl h-14 text-lg border-none shadow-inner bg-[#FFFDEF] p-4"
                                />
                            </Form.Item>

                            <Form.Item
                                label={<span className="text-xl font-extrabold text-[#3b662b] font-serif tracking-wide">Tên đăng nhập :</span>}
                                name="username"
                                rules={[
                                    { required: true },
                                    {
                                        pattern: /^[a-z0-9_.]{6,}$/,
                                        message: 'Tối thiểu 6 ký tự, chỉ gồm chữ viết thường, số, chấm (.) và gạch dưới (_)'
                                    }
                                ]}
                            >
                                <Input
                                    placeholder="VD: kien_123"
                                    className="rounded-2xl h-14 text-lg border-none shadow-inner bg-[#FFFDEF] p-4"
                                />
                            </Form.Item>

                            <Form.Item
                                label={<span className="text-xl font-extrabold text-[#3b662b] font-serif tracking-wide">Mật khẩu :</span>}
                                name="password"
                                rules={[{ required: true }]}
                            >
                                <Input.Password
                                    placeholder="*********"
                                    className="rounded-2xl h-14 text-lg border-none shadow-inner bg-[#FFFDEF] p-4"
                                />
                            </Form.Item>

                            <Form.Item
                                label={<span className="text-xl font-extrabold text-[#3b662b] font-serif tracking-wide">Ngày tháng năm sinh :</span>}
                                name="dob"
                                rules={[{ required: true }]}
                            >
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    placeholder="Chọn ngày sinh"
                                    className="rounded-2xl h-14 text-lg border-none shadow-inner bg-[#FFFDEF] w-full p-4"
                                />
                            </Form.Item>

                            <Form.Item
                                label={<span className="text-xl font-extrabold text-[#3b662b] font-serif tracking-wide">Nhập lại mật khẩu :</span>}
                                name="confirmPassword"
                                dependencies={['password']}
                                rules={[
                                    { required: true },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Mật khẩu không khớp!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    placeholder="*********"
                                    className="rounded-2xl h-14 text-lg border-none shadow-inner bg-[#FFFDEF] p-4"
                                />
                            </Form.Item>

                            <Form.Item
                                label={<span className="text-xl font-extrabold text-[#3b662b] font-serif tracking-wide">Số điện thoại :</span>}
                                name="phone"
                                rules={[{ required: true }]}
                            >
                                <Input
                                    placeholder="Số điện thoại liên hệ"
                                    className="rounded-2xl h-14 text-lg border-none shadow-inner bg-[#FFFDEF] p-4"
                                />
                            </Form.Item>

                            <Form.Item
                                label={<span className="text-xl font-extrabold text-[#3b662b] font-serif tracking-wide">Đối tượng :</span>}
                                name="role"
                                rules={[{ required: true }]}
                            >
                                <div className="w-full h-14 bg-[#FFFDEF] px-6 rounded-2xl shadow-inner flex items-center">
                                    <Radio.Group className="flex items-center w-full">
                                        <Radio value="student" className="text-lg font-bold flex items-center mr-8">Học sinh</Radio>
                                        <Radio value="teacher" className="text-lg font-bold flex items-center">Giáo viên</Radio>
                                    </Radio.Group>
                                </div>
                            </Form.Item>

                            <Form.Item
                                label={<span className="text-xl font-extrabold text-[#3b662b] font-serif tracking-wide">Trường học :</span>}
                                name="school"
                                rules={[{ required: true }]}
                            >
                                <Input
                                    placeholder="Trường đang học/giảng dạy"
                                    className="rounded-2xl h-14 text-lg border-none shadow-inner bg-[#FFFDEF] p-4"
                                />
                            </Form.Item>

                            <Form.Item
                                className="md:col-span-2"
                                label={<span className="text-xl font-extrabold text-[#3b662b] font-serif tracking-wide">Địa chỉ (Quận/Huyện/Tỉnh - TP) :</span>}
                                name="address"
                                rules={[{ required: true }]}
                            >
                                <Input
                                    placeholder="Ví dụ: Quận Cầu Giấy, Hà Nội"
                                    className="rounded-2xl h-14 text-lg border-none shadow-inner bg-[#FFFDEF] p-4"
                                />
                            </Form.Item>
                        </div>

                        <Form.Item className="mt-6 flex justify-center mb-0">
                            {/* --- NÚT BẤM CHUYỂN MÀU ĐỎ ĐỂ NỔI BẬT TRÊN NỀN XANH --- */}
                            <button
                                type="submit"
                                loading={loading}
                                className="bg-[#EB7470] hover:bg-[#d66562] text-white text-3xl font-extrabold px-16 py-4 rounded-full shadow-[0_6px_0_#b34b48] hover:shadow-[0_2px_0_#b34b48] hover:translate-y-1 transition-all cursor-pointer border-none"
                            >
                                Đăng ký ngay
                            </button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Register;